import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { CrowdFunding__factory } from "../typechain-types";

const delay = (tm: number) => new Promise((resolve, reject) => setTimeout(resolve, tm));

describe("CrowdFunding", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function crowdFundingFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const CrowdFundingFactory = (await ethers.getContractFactory("CrowdFunding")) as CrowdFunding__factory;
    const crowdFundingContract = await CrowdFundingFactory.deploy();
    const ownerContract = crowdFundingContract.connect(owner);
    const otherAccountContract = crowdFundingContract.connect(otherAccount);
    const secondsAgo = new Date(Date.now() - 20000).getTime(); //20 seconds ago
    const fiveSecsAway = new Date(Date.now() + 5000).getTime(); //5 seconds away
    const futureDate = new Date(Date.now() + 10 * 86400000).getTime(); //10 days away
    const fundingGoal = ethers.utils.parseEther("3");
    const zeroAmount = ethers.utils.parseEther("0");
    const campaignParams = (params: { isFuture?: boolean; goal?: BigNumber; endDate?: number }) =>
      [
        "Make a new balloon",
        "Entertainment",
        "Short description about campaign",
        "Long description about campaign",
        "https://image.com",
        params?.goal ?? fundingGoal,
        Math.floor((params?.endDate ? params.endDate : params?.isFuture ? futureDate : secondsAgo) / 1000),
      ] as [string, string, string, string, string, BigNumber, number];
    return {
      crowdFundingContract,
      owner,
      otherAccount,
      ownerContract,
      otherAccountContract,
      secondsAgo,
      futureDate,
      fundingGoal,
      zeroAmount,
      fiveSecsAway,
      campaignParams,
    };
  }

  async function runContractFixture() {
    const { ownerContract, campaignParams } = await loadFixture(crowdFundingFixture);

    const tx = await ownerContract.createCampaign(...campaignParams({ isFuture: true }));
    const txReceipt = await tx.wait(1);
    const campaignId = (txReceipt as any).events[0].args.campaignId;
    return { campaignId };
  }

  describe("create campaign", () => {
    it("should revert error date must be in future", async () => {
      const { ownerContract, campaignParams } = await loadFixture(crowdFundingFixture);
      await expect(ownerContract.createCampaign(...campaignParams({ isFuture: false }))).to.be.revertedWithCustomError(
        ownerContract,
        "DateMustBeFuture"
      );
    });
    it("should revert error funding goal", async () => {
      const { ownerContract, zeroAmount, campaignParams } = await loadFixture(crowdFundingFixture);

      await expect(
        ownerContract.createCampaign(...campaignParams({ isFuture: true, goal: zeroAmount }))
      ).to.be.revertedWithCustomError(ownerContract, "FundingGoalMustBeGreaterThanZero");
    });
    it("should create a campaign", async () => {
      const { ownerContract, campaignParams } = await loadFixture(crowdFundingFixture);

      const tx = await ownerContract.createCampaign(...campaignParams({ isFuture: true }));
      const txReceipt = await tx.wait(1);
      expect(tx).to.emit(ownerContract, "CampaignCreated");

      const campaignId = (txReceipt as any).events[0].args.campaignId;
      expect(campaignId).to.not.be.empty;
      expect(campaignId.toString()).to.equal("0");
    });
  });

  describe("fund campaign", () => {
    it("should emit donation received", async () => {
      const { ownerContract } = await loadFixture(crowdFundingFixture);
      const { campaignId } = await loadFixture(runContractFixture);
      const amount = ethers.utils.parseEther("0.1");
      const tx = await ownerContract.fundCampaign(campaignId, "Love your campaign", {
        value: amount,
      });
      await tx.wait(1);
      expect(tx).to.emit(ownerContract, "CampaignFundReceived");
    });

    it("should revert campaign ended", async () => {
      const { ownerContract, campaignParams, fiveSecsAway } = await loadFixture(crowdFundingFixture);
      const tx2 = await ownerContract.createCampaign(...campaignParams({ endDate: fiveSecsAway }));
      const txReceipt2 = await tx2.wait(1);
      const campaignId2 = (txReceipt2 as any).events[0].args.campaignId;

      await delay(10000); //wait for 10seconds to beat end date of 5seconds
      const amount = ethers.utils.parseEther("0.1");
      await expect(
        ownerContract.fundCampaign(campaignId2, "Love your campaign", {
          value: amount,
        })
      ).to.revertedWith("CrowdFunding: Campaign has ended.");
    });
  });

  describe("withdraw funds", () => {
    it("should revert campaign not ended", async () => {
      const { ownerContract } = await loadFixture(crowdFundingFixture);
      const { campaignId } = await loadFixture(runContractFixture);
      await expect(ownerContract.withdrawFunds(campaignId)).to.revertedWith("CrowdFunding: Campaign has not ended.");
    });
    it("should revert low withdrawal amount", async () => {
      const { ownerContract, campaignParams, fiveSecsAway } = await loadFixture(crowdFundingFixture);
      const tx2 = await ownerContract.createCampaign(...campaignParams({ endDate: fiveSecsAway }));
      const txReceipt2 = await tx2.wait(1);
      const campaignId = (txReceipt2 as any).events[0].args.campaignId;

      await delay(10000); //wait for 10seconds to beat end date of 5seconds
      await expect(ownerContract.withdrawFunds(campaignId)).to.revertedWith(
        "CrowdFunding: Withdrawal amount is too low."
      );
    });

    it("should emit funds withdrawn", async () => {
      const { ownerContract, campaignParams, fiveSecsAway } = await loadFixture(crowdFundingFixture);
      const tx1 = await ownerContract.createCampaign(...campaignParams({ endDate: fiveSecsAway }));
      const tx1Receipt = await tx1.wait(1);
      const campaignId = (tx1Receipt as any).events[0].args.campaignId;

      const amount = ethers.utils.parseEther("0.1");
      const tx2 = await ownerContract.fundCampaign(campaignId, "Love your campaign", {
        value: amount,
      });
      await tx2.wait(1);
      expect(tx2).to.emit(ownerContract, "CampaignFundReceived");

      await delay(10000); //wait for 10seconds to beat end date of 5seconds
      const tx3 = await ownerContract.withdrawFunds(campaignId);
      await tx3.wait(1);
      expect(tx3).to.emit(ownerContract, "CampaignFundWithdrawn");
    });
  });

  describe("withdraw profit", () => {
    it("should revert action not permitted", async () => {
      const { otherAccountContract } = await loadFixture(crowdFundingFixture);
      await expect(otherAccountContract.withdrawProfit()).to.revertedWith(
        "CrowdFunding: Action permitted to contract owner only."
      );
    });
  });
});
