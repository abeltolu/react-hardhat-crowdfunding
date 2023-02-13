// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error DateMustBeFuture();
error FundingGoalMustBeGreaterThanZero();
error CampaignNotFound();

contract CrowdFunding {
  //events
  event CampaignCreated(uint256 indexed campaignId);
  event CampaignFundReceived(uint256 indexed campaignId, address indexed funderAddress, uint256 amount);
  event CampaignFundWithdrawn(
    uint256 indexed campaignId,
    address indexed receipient,
    uint256 amountDebited,
    uint256 amountSent
  );

  //enum
  enum CampaignStatus {
    OPEN,
    CLOSED
  }

  //structs
  struct CampaignFunder {
    address funderAddress;
    uint256 amount;
    uint timestamp;
  }

  struct Withdrawal {
    uint256 amount;
    uint timestamp;
  }

  struct Campaign {
    address payable owner;
    string title;
    string category;
    string description;
    string story;
    uint256 fundingGoal;
    string image;
    uint endDate;
    uint256 availableFunds;
    uint256 totalFundsReceived;
    bool isFundsWithdrawn;
    CampaignStatus status;
    uint createdAt;
    //funders
    uint fundersCount;
    mapping(uint => CampaignFunder) funders;
    //withdrawals
    uint withdrawalCount;
    mapping(uint => Withdrawal) withdrawals;
  }

  struct CampaignSummary {
    address payable owner;
    string title;
    string category;
    string description;
    string story;
    uint256 fundingGoal;
    string image;
    uint endDate;
    uint256 availableFunds;
    uint256 totalFundsReceived;
    bool isFundsWithdrawn;
    CampaignStatus status;
    uint createdAt;
    uint fundersCount;
    uint withdrawalCount;
  }

  //inital values
  uint256 private campaignsCount;
  uint256 private contractProfit;
  address payable public contractOwner;

  //mappings
  mapping(uint256 => Campaign) private campaigns;
  mapping(address => uint256[]) private ownerCampaignIds;

  constructor() {
    campaignsCount = 0;
    contractProfit = 0;
    contractOwner = payable(msg.sender);
  }

  function createCampaign(
    string memory _title,
    string memory _category,
    string memory _description,
    string memory _story,
    string memory _image,
    uint256 _fundingGoal,
    uint _endDate
  ) public {
    //check if enddate is passed
    if (_endDate < block.timestamp) revert DateMustBeFuture();

    //check funding goal is greater than 0
    if (_fundingGoal <= 0) revert FundingGoalMustBeGreaterThanZero();

    Campaign storage c = campaigns[campaignsCount];
    c.title = _title;
    c.category = _category;
    c.description = _description;
    c.story = _story;
    c.fundingGoal = _fundingGoal;
    c.image = _image;
    c.endDate = _endDate;
    c.owner = payable(msg.sender);
    c.availableFunds = 0;
    c.totalFundsReceived = 0;
    c.isFundsWithdrawn = false;
    c.status = CampaignStatus.OPEN;
    c.createdAt = block.timestamp;
    c.fundersCount = 0;
    c.withdrawalCount = 0;

    ownerCampaignIds[msg.sender].push(campaignsCount);

    emit CampaignCreated(campaignsCount);

    campaignsCount++;
  }

  function isBefore(uint _date1, uint _date2) internal pure returns (bool) {
    if (_date1 < _date2) return true;
    return false;
  }

  function isAfter(uint _date1, uint _date2) internal pure returns (bool) {
    if (_date1 > _date2) return true;
    return false;
  }

  function fundCampaign(uint256 _campaignId) public payable validCampaign(_campaignId) {
    Campaign storage campaign = campaigns[_campaignId];
    if (isBefore(campaign.endDate, block.timestamp)) revert("CrowdFunding: Campaign has ended.");
    if (campaign.status == CampaignStatus.CLOSED) revert("CrowdFunding: Campaign is closed.");

    campaign.availableFunds += msg.value;
    campaign.totalFundsReceived += msg.value;
    campaign.funders[campaign.fundersCount] = CampaignFunder({
      funderAddress: msg.sender,
      amount: msg.value,
      timestamp: block.timestamp
    });
    campaign.fundersCount++;

    emit CampaignFundReceived(_campaignId, msg.sender, msg.value);
  }

  function withdrawFunds(uint256 _campaignId) public validCampaign(_campaignId) isCampaignOwner(_campaignId) {
    Campaign storage campaign = campaigns[_campaignId];
    if (isAfter(campaign.endDate, block.timestamp)) revert("CrowdFunding: Campaign has not ended.");

    uint256 availableAmount = campaign.availableFunds;
    if (availableAmount <= 0) revert("CrowdFunding: Withdrawal amount is too low.");

    uint256 amountToSend = (availableAmount * 9) / 10; //Only send 90% of the amount
    campaign.owner.transfer(amountToSend);

    campaign.availableFunds = 0;
    campaign.withdrawals[campaign.withdrawalCount] = Withdrawal({amount: availableAmount, timestamp: block.timestamp});
    campaign.withdrawalCount++;
    campaign.status = CampaignStatus.CLOSED;

    contractProfit += availableAmount - amountToSend;

    emit CampaignFundWithdrawn(_campaignId, msg.sender, availableAmount, amountToSend);
  }

  function withdrawProfit() public {
    if (msg.sender != contractOwner) revert("CrowdFunding: Action permitted to contract owner only.");
    if (contractProfit <= 0) revert("CrowdFunding: Withdrawal amount is too low.");

    contractOwner.transfer(contractProfit);
    contractProfit = 0;
  }

  function switchStatus(uint256 _campaignId) public validCampaign(_campaignId) isContractOwner {
    Campaign storage campaign = campaigns[_campaignId];
    campaign.status = campaign.status == CampaignStatus.OPEN ? CampaignStatus.CLOSED : CampaignStatus.OPEN;
  }

  function userCampaigns() public view returns (CampaignSummary[] memory) {
    CampaignSummary[] memory m_campaigns;
    uint256[] memory m_campaignIds = ownerCampaignIds[msg.sender];
    for (uint i = 0; i < m_campaignIds.length; i++) {
      uint campaignId = m_campaignIds[i];
      Campaign storage i_campaign = campaigns[campaignId];
      m_campaigns[i] = summarizeCampaign(i_campaign);
    }
    return m_campaigns;
  }

  //   function getU2serCampaigns() public view returns (Campaign[] memory) {
  //     Campaign[] memory m_Campaigns;
  //     uint256[] memory m_campaignIds = ownerCampaignIds[msg.sender];
  //     for (uint i = 0; i < m_campaignIds.length; i++) {
  //       Campaign memory i_campaign = campaigns[m_campaignIds[i]];
  //       m_Campaigns[i] = i_campaign;
  //     }
  //     return m_Campaigns;

  //     // uint256[] memory campaignIds = ownerCampaignIds[msg.sender];

  //     // // In Solidity, arrays of structs in memory cannot be resized dynamically.
  //     // // Instead, you need to create a new array with the desired size, copy the
  //     // // elements from the old array to the new array, and then add the new element.
  //     // Campaign[] memory campaignsArray = new Campaign[](campaignIds.length);

  //     // for (uint i = 0; i < campaignIds.length; i++) {
  //     //   Campaign memory campaign = campaigns[campaignIds[i]];
  //     //   campaignsArray[i] = campaign;
  //     // }
  //     // return campaignsArray;
  //   }

  function allCampaigns() public view returns (CampaignSummary[] memory) {
    CampaignSummary[] memory m_campaigns = new CampaignSummary[](campaignsCount);
    for (uint i = 0; i < campaignsCount; i++) {
      m_campaigns[i] = summarizeCampaign(campaigns[i]);
    }
    return m_campaigns;
  }

  function campaignById(uint256 _campaignId) public view validCampaign(_campaignId) returns (CampaignSummary memory) {
    return summarizeCampaign(campaigns[_campaignId]);
  }

  function campaignFunders(
    uint256 _campaignId
  ) public view validCampaign(_campaignId) returns (CampaignFunder[] memory) {
    Campaign storage i_campaign = campaigns[_campaignId];
    CampaignFunder[] memory funders;
    for (uint i = 0; i < i_campaign.fundersCount; i++) {
      CampaignFunder memory i_funder = i_campaign.funders[i];
      funders[i] = i_funder;
    }
    return funders;
  }

  function campaignWithdrawals(
    uint256 _campaignId
  ) public view validCampaign(_campaignId) isCampaignOwner(_campaignId) returns (Withdrawal[] memory) {
    Campaign storage i_campaign = campaigns[_campaignId];
    Withdrawal[] memory withdrawals;
    for (uint i = 0; i < i_campaign.withdrawalCount; i++) {
      Withdrawal memory i_withdrawal = i_campaign.withdrawals[i];
      withdrawals[i] = i_withdrawal;
    }
    return withdrawals;
  }

  //internal functions
  function campaignExists(uint256 _campaignId) internal view returns (bool) {
    return _campaignId <= campaignsCount && campaigns[_campaignId].owner != address(0);
  }

  //structs in Solidity cannot contain mappings, and therefore cannot be returned by an external function.
  //this was the reason for summarizing the campaign to exclude funders and withdrawals
  function summarizeCampaign(Campaign storage i_campaign) internal view returns (CampaignSummary memory) {
    return
      CampaignSummary({
        owner: i_campaign.owner,
        title: i_campaign.title,
        category: i_campaign.category,
        description: i_campaign.description,
        story: i_campaign.story,
        fundingGoal: i_campaign.fundingGoal,
        image: i_campaign.image,
        endDate: i_campaign.endDate,
        availableFunds: i_campaign.availableFunds,
        totalFundsReceived: i_campaign.totalFundsReceived,
        isFundsWithdrawn: i_campaign.isFundsWithdrawn,
        status: i_campaign.status,
        createdAt: i_campaign.createdAt,
        fundersCount: i_campaign.fundersCount,
        withdrawalCount: i_campaign.withdrawalCount
      });
  }

  // modifiers
  modifier validCampaign(uint256 _campaignId) {
    if (!campaignExists(_campaignId)) revert CampaignNotFound();
    _;
  }

  modifier isCampaignOwner(uint256 _campaignId) {
    CampaignSummary memory campaign = summarizeCampaign(campaigns[_campaignId]);
    if (msg.sender != campaign.owner) {
      revert("CrowdFunding: Only the campaign owner is permitted this action.");
    }
    _;
  }

  modifier isContractOwner() {
    if (msg.sender != contractOwner) {
      revert("CrowdFunding: Only the contract owner is permitted this action.");
    }
    _;
  }
}
