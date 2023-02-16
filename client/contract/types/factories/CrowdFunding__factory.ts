/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { CrowdFunding, CrowdFundingInterface } from "../CrowdFunding";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CampaignNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "DateMustBeFuture",
    type: "error",
  },
  {
    inputs: [],
    name: "FundingGoalMustBeGreaterThanZero",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CampaignFundReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDebited",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSent",
        type: "uint256",
      },
    ],
    name: "CampaignFundWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "allCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "story",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fundingGoal",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableFunds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFundsReceived",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isFundsWithdrawn",
            type: "bool",
          },
          {
            internalType: "enum CrowdFunding.CampaignStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundersCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "withdrawalCount",
            type: "uint256",
          },
        ],
        internalType: "struct CrowdFunding.CampaignSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "campaignById",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "story",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fundingGoal",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableFunds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFundsReceived",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isFundsWithdrawn",
            type: "bool",
          },
          {
            internalType: "enum CrowdFunding.CampaignStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundersCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "withdrawalCount",
            type: "uint256",
          },
        ],
        internalType: "struct CrowdFunding.CampaignSummary",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "campaignFunders",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "funderAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct CrowdFunding.CampaignFunder[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "campaignWithdrawals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct CrowdFunding.Withdrawal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractOwner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_story",
        type: "string",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fundingGoal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "fundCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "switchStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "userCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "story",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fundingGoal",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableFunds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFundsReceived",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isFundsWithdrawn",
            type: "bool",
          },
          {
            internalType: "enum CrowdFunding.CampaignStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundersCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "withdrawalCount",
            type: "uint256",
          },
        ],
        internalType: "struct CrowdFunding.CampaignSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawProfit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060008081905550600060018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612c20806100706000396000f3fe60806040526004361061009c5760003560e01c8063959499b611610064578063959499b61461017957806398bf6de814610190578063aa544496146101cd578063ce606ee0146101f6578063eaa1726c14610221578063ffe303591461025e5761009c565b8063155dd5ee146100a157806347ce3928146100ca578063503c5641146100e657806365286a15146101115780637330f3ed1461014e575b600080fd5b3480156100ad57600080fd5b506100c860048036038101906100c39190611846565b610287565b005b6100e460048036038101906100df91906119b9565b6105a6565b005b3480156100f257600080fd5b506100fb61082b565b6040516101089190611d97565b60405180910390f35b34801561011d57600080fd5b5061013860048036038101906101339190611846565b610947565b6040516101459190611eff565b60405180910390f35b34801561015a57600080fd5b50610163610b10565b6040516101709190611d97565b60405180910390f35b34801561018557600080fd5b5061018e610bcc565b005b34801561019c57600080fd5b506101b760048036038101906101b29190611846565b610d16565b6040516101c49190612080565b60405180910390f35b3480156101d957600080fd5b506101f460048036038101906101ef91906120a2565b610d81565b005b34801561020257600080fd5b5061020b610fef565b60405161021891906121df565b60405180910390f35b34801561022d57600080fd5b5061024860048036038101906102439190611846565b611015565b60405161025591906122d8565b60405180910390f35b34801561026a57600080fd5b5061028560048036038101906102809190611846565b61118a565b005b80610291816112e8565b6102c7576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160006102e560036000848152602001908152602001600020611365565b9050806000015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610359576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103509061237d565b60405180910390fd5b600060036000868152602001908152602001600020905061037e816007015442611720565b156103be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b59061240f565b60405180910390fd5b6000816008015490506000811161040a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610401906124a1565b60405180910390fd5b6000600a60098361041b91906124f0565b6104259190612561565b90508260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610491573d6000803e3d6000fd5b506000836008018190555060405180604001604052808381526020014281525083600f01600085600e01548152602001908152602001600020600082015181600001556020820151816001015590505082600e0160008154809291906104f690612592565b9190505550600183600a0160016101000a81548160ff0219169083600181111561052357610522611b2b565b5b0217905550808261053491906125da565b60016000828254610545919061260e565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16877f1d9f471dcb077d7200646beaf509c43f3245c69d81fab9c75dca9d2c49271b7e8484604051610595929190612651565b60405180910390a350505050505050565b816105b0816112e8565b6105e6576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060036000858152602001908152602001600020905061060b81600701544261173e565b1561064b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610642906126ec565b60405180910390fd5b60018081111561065e5761065d611b2b565b5b81600a0160019054906101000a900460ff16600181111561068257610681611b2b565b5b036106c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b99061277e565b60405180910390fd5b348160080160008282546106d6919061260e565b92505081905550348160090160008282546106f1919061260e565b9250508190555060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020013481526020014281526020018481525081600d01600083600c0154815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030190816107b891906129aa565b5090505080600c0160008154809291906107d190612592565b91905055503373ffffffffffffffffffffffffffffffffffffffff16847fe0b1c662a0f27057e2255bb28bc23113eb11b1ac3a79603a958d867bb7eb505a3460405161081d9190612a7c565b60405180910390a350505050565b6060806000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156108b957602002820191906000526020600020905b8154815260200190600101908083116108a5575b5050505050905060005b815181101561093e5760008282815181106108e1576108e0612a97565b5b60200260200101519050600060036000838152602001908152602001600020905061090b81611365565b85848151811061091e5761091d612a97565b5b60200260200101819052505050808061093690612592565b9150506108c3565b50819250505090565b606081610953816112e8565b610989576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008581526020019081526020016000209050606060005b82600c0154811015610b0457600083600d0160008381526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382018054610a4d906127cd565b80601f0160208091040260200160405190810160405280929190818152602001828054610a79906127cd565b8015610ac65780601f10610a9b57610100808354040283529160200191610ac6565b820191906000526020600020905b815481529060010190602001808311610aa957829003601f168201915b505050505081525050905080838381518110610ae557610ae4612a97565b5b6020026020010181905250508080610afc90612592565b9150506109a5565b50809350505050919050565b60606000805467ffffffffffffffff811115610b2f57610b2e61188e565b5b604051908082528060200260200182016040528015610b6857816020015b610b5561175c565b815260200190600190039081610b4d5790505b50905060005b600054811015610bc457610b9360036000838152602001908152602001600020611365565b828281518110610ba657610ba5612a97565b5b60200260200101819052508080610bbc90612592565b915050610b6e565b508091505090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5390612b38565b60405180910390fd5b600060015411610ca1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c98906124a1565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f19350505050158015610d0b573d6000803e3d6000fd5b506000600181905550565b610d1e61175c565b81610d28816112e8565b610d5e576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610d7960036000858152602001908152602001600020611365565b915050919050565b42811015610dbb576040517fe88111b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008211610df5576040517fcb3b807f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006003600080548152602001908152602001600020905087816001019081610e1e91906129aa565b5086816002019081610e3091906129aa565b5085816003019081610e4291906129aa565b5084816004019081610e5491906129aa565b5082816005018190555083816006019081610e6f91906129aa565b50818160070181905550338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000816008018190555060008160090181905550600081600a0160006101000a81548160ff021916908315150217905550600081600a0160016101000a81548160ff02191690836001811115610f1557610f14611b2b565b5b02179055504281600b0181905550600081600c0181905550600081600e0181905550600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005490806001815401808255809150506001900390600052602060002001600090919091909150556000547fbc0a5edd152fa5b886dcae82c5c109d113708653b4b9c0224549ccdf715af94e60405160405180910390a2600080815480929190610fe090612592565b91905055505050505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606081611021816112e8565b611057576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82600061107560036000848152602001908152602001600020611365565b9050806000015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146110e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e09061237d565b60405180910390fd5b6000600360008781526020019081526020016000209050606060005b82600e015481101561117c57600083600f0160008381526020019081526020016000206040518060400160405290816000820154815260200160018201548152505090508083838151811061115d5761115c612a97565b5b602002602001018190525050808061117490612592565b915050611105565b508095505050505050919050565b80611194816112e8565b6111ca576040517f6ff36e1600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461125a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125190612bca565b60405180910390fd5b60006003600084815260200190815260200160002090506000600181111561128557611284611b2b565b5b81600a0160019054906101000a900460ff1660018111156112a9576112a8611b2b565b5b146112b55760006112b8565b60015b81600a0160016101000a81548160ff021916908360018111156112de576112dd611b2b565b5b0217905550505050565b60008054821115801561135e5750600073ffffffffffffffffffffffffffffffffffffffff166003600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b9050919050565b61136d61175c565b604051806101e001604052808360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360010180546113c8906127cd565b80601f01602080910402602001604051908101604052809291908181526020018280546113f4906127cd565b80156114415780601f1061141657610100808354040283529160200191611441565b820191906000526020600020905b81548152906001019060200180831161142457829003601f168201915b5050505050815260200183600201805461145a906127cd565b80601f0160208091040260200160405190810160405280929190818152602001828054611486906127cd565b80156114d35780601f106114a8576101008083540402835291602001916114d3565b820191906000526020600020905b8154815290600101906020018083116114b657829003601f168201915b505050505081526020018360030180546114ec906127cd565b80601f0160208091040260200160405190810160405280929190818152602001828054611518906127cd565b80156115655780601f1061153a57610100808354040283529160200191611565565b820191906000526020600020905b81548152906001019060200180831161154857829003601f168201915b5050505050815260200183600401805461157e906127cd565b80601f01602080910402602001604051908101604052809291908181526020018280546115aa906127cd565b80156115f75780601f106115cc576101008083540402835291602001916115f7565b820191906000526020600020905b8154815290600101906020018083116115da57829003601f168201915b505050505081526020018360050154815260200183600601805461161a906127cd565b80601f0160208091040260200160405190810160405280929190818152602001828054611646906127cd565b80156116935780601f1061166857610100808354040283529160200191611693565b820191906000526020600020905b81548152906001019060200180831161167657829003601f168201915b5050505050815260200183600701548152602001836008015481526020018360090154815260200183600a0160009054906101000a900460ff161515815260200183600a0160019054906101000a900460ff1660018111156116f8576116f7611b2b565b5b815260200183600b0154815260200183600c0154815260200183600e01548152509050919050565b6000818311156117335760019050611738565b600090505b92915050565b6000818310156117515760019050611756565b600090505b92915050565b604051806101e00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001606081526020016060815260200160608152602001606081526020016000815260200160608152602001600081526020016000815260200160008152602001600015158152602001600060018111156117e1576117e0611b2b565b5b81526020016000815260200160008152602001600081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61182381611810565b811461182e57600080fd5b50565b6000813590506118408161181a565b92915050565b60006020828403121561185c5761185b611806565b5b600061186a84828501611831565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6118c68261187d565b810181811067ffffffffffffffff821117156118e5576118e461188e565b5b80604052505050565b60006118f86117fc565b905061190482826118bd565b919050565b600067ffffffffffffffff8211156119245761192361188e565b5b61192d8261187d565b9050602081019050919050565b82818337600083830152505050565b600061195c61195784611909565b6118ee565b90508281526020810184848401111561197857611977611878565b5b61198384828561193a565b509392505050565b600082601f8301126119a05761199f611873565b5b81356119b0848260208601611949565b91505092915050565b600080604083850312156119d0576119cf611806565b5b60006119de85828601611831565b925050602083013567ffffffffffffffff8111156119ff576119fe61180b565b5b611a0b8582860161198b565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611a6c82611a41565b9050919050565b611a7c81611a61565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611abc578082015181840152602081019050611aa1565b60008484015250505050565b6000611ad382611a82565b611add8185611a8d565b9350611aed818560208601611a9e565b611af68161187d565b840191505092915050565b611b0a81611810565b82525050565b60008115159050919050565b611b2581611b10565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611b6b57611b6a611b2b565b5b50565b6000819050611b7c82611b5a565b919050565b6000611b8c82611b6e565b9050919050565b611b9c81611b81565b82525050565b60006101e083016000830151611bbb6000860182611a73565b5060208301518482036020860152611bd38282611ac8565b91505060408301518482036040860152611bed8282611ac8565b91505060608301518482036060860152611c078282611ac8565b91505060808301518482036080860152611c218282611ac8565b91505060a0830151611c3660a0860182611b01565b5060c083015184820360c0860152611c4e8282611ac8565b91505060e0830151611c6360e0860182611b01565b50610100830151611c78610100860182611b01565b50610120830151611c8d610120860182611b01565b50610140830151611ca2610140860182611b1c565b50610160830151611cb7610160860182611b93565b50610180830151611ccc610180860182611b01565b506101a0830151611ce16101a0860182611b01565b506101c0830151611cf66101c0860182611b01565b508091505092915050565b6000611d0d8383611ba2565b905092915050565b6000602082019050919050565b6000611d2d82611a15565b611d378185611a20565b935083602082028501611d4985611a31565b8060005b85811015611d855784840389528151611d668582611d01565b9450611d7183611d15565b925060208a01995050600181019050611d4d565b50829750879550505050505092915050565b60006020820190508181036000830152611db18184611d22565b905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000611df082611a41565b9050919050565b611e0081611de5565b82525050565b6000608083016000830151611e1e6000860182611df7565b506020830151611e316020860182611b01565b506040830151611e446040860182611b01565b5060608301518482036060860152611e5c8282611ac8565b9150508091505092915050565b6000611e758383611e06565b905092915050565b6000602082019050919050565b6000611e9582611db9565b611e9f8185611dc4565b935083602082028501611eb185611dd5565b8060005b85811015611eed5784840389528151611ece8582611e69565b9450611ed983611e7d565b925060208a01995050600181019050611eb5565b50829750879550505050505092915050565b60006020820190508181036000830152611f198184611e8a565b905092915050565b60006101e083016000830151611f3a6000860182611a73565b5060208301518482036020860152611f528282611ac8565b91505060408301518482036040860152611f6c8282611ac8565b91505060608301518482036060860152611f868282611ac8565b91505060808301518482036080860152611fa08282611ac8565b91505060a0830151611fb560a0860182611b01565b5060c083015184820360c0860152611fcd8282611ac8565b91505060e0830151611fe260e0860182611b01565b50610100830151611ff7610100860182611b01565b5061012083015161200c610120860182611b01565b50610140830151612021610140860182611b1c565b50610160830151612036610160860182611b93565b5061018083015161204b610180860182611b01565b506101a08301516120606101a0860182611b01565b506101c08301516120756101c0860182611b01565b508091505092915050565b6000602082019050818103600083015261209a8184611f21565b905092915050565b600080600080600080600060e0888a0312156120c1576120c0611806565b5b600088013567ffffffffffffffff8111156120df576120de61180b565b5b6120eb8a828b0161198b565b975050602088013567ffffffffffffffff81111561210c5761210b61180b565b5b6121188a828b0161198b565b965050604088013567ffffffffffffffff8111156121395761213861180b565b5b6121458a828b0161198b565b955050606088013567ffffffffffffffff8111156121665761216561180b565b5b6121728a828b0161198b565b945050608088013567ffffffffffffffff8111156121935761219261180b565b5b61219f8a828b0161198b565b93505060a06121b08a828b01611831565b92505060c06121c18a828b01611831565b91505092959891949750929550565b6121d981611a61565b82525050565b60006020820190506121f460008301846121d0565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60408201600082015161223c6000850182611b01565b50602082015161224f6020850182611b01565b50505050565b60006122618383612226565b60408301905092915050565b6000602082019050919050565b6000612285826121fa565b61228f8185612205565b935061229a83612216565b8060005b838110156122cb5781516122b28882612255565b97506122bd8361226d565b92505060018101905061229e565b5085935050505092915050565b600060208201905081810360008301526122f2818461227a565b905092915050565b600082825260208201905092915050565b7f43726f776446756e64696e673a204f6e6c79207468652063616d706169676e2060008201527f6f776e6572206973207065726d6974746564207468697320616374696f6e2e00602082015250565b6000612367603f836122fa565b91506123728261230b565b604082019050919050565b600060208201905081810360008301526123968161235a565b9050919050565b7f43726f776446756e64696e673a2043616d706169676e20686173206e6f74206560008201527f6e6465642e000000000000000000000000000000000000000000000000000000602082015250565b60006123f96025836122fa565b91506124048261239d565b604082019050919050565b60006020820190508181036000830152612428816123ec565b9050919050565b7f43726f776446756e64696e673a205769746864726177616c20616d6f756e742060008201527f697320746f6f206c6f772e000000000000000000000000000000000000000000602082015250565b600061248b602b836122fa565b91506124968261242f565b604082019050919050565b600060208201905081810360008301526124ba8161247e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006124fb82611810565b915061250683611810565b925082820261251481611810565b9150828204841483151761252b5761252a6124c1565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061256c82611810565b915061257783611810565b92508261258757612586612532565b5b828204905092915050565b600061259d82611810565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036125cf576125ce6124c1565b5b600182019050919050565b60006125e582611810565b91506125f083611810565b9250828203905081811115612608576126076124c1565b5b92915050565b600061261982611810565b915061262483611810565b925082820190508082111561263c5761263b6124c1565b5b92915050565b61264b81611810565b82525050565b60006040820190506126666000830185612642565b6126736020830184612642565b9392505050565b7f43726f776446756e64696e673a2043616d706169676e2068617320656e64656460008201527f2e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006126d66021836122fa565b91506126e18261267a565b604082019050919050565b60006020820190508181036000830152612705816126c9565b9050919050565b7f43726f776446756e64696e673a2043616d706169676e20697320636c6f73656460008201527f2e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006127686021836122fa565b91506127738261270c565b604082019050919050565b600060208201905081810360008301526127978161275b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806127e557607f821691505b6020821081036127f8576127f761279e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026128607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612823565b61286a8683612823565b95508019841693508086168417925050509392505050565b6000819050919050565b60006128a76128a261289d84611810565b612882565b611810565b9050919050565b6000819050919050565b6128c18361288c565b6128d56128cd826128ae565b848454612830565b825550505050565b600090565b6128ea6128dd565b6128f58184846128b8565b505050565b5b818110156129195761290e6000826128e2565b6001810190506128fb565b5050565b601f82111561295e5761292f816127fe565b61293884612813565b81016020851015612947578190505b61295b61295385612813565b8301826128fa565b50505b505050565b600082821c905092915050565b600061298160001984600802612963565b1980831691505092915050565b600061299a8383612970565b9150826002028217905092915050565b6129b382611a82565b67ffffffffffffffff8111156129cc576129cb61188e565b5b6129d682546127cd565b6129e182828561291d565b600060209050601f831160018114612a145760008415612a02578287015190505b612a0c858261298e565b865550612a74565b601f198416612a22866127fe565b60005b82811015612a4a57848901518255600182019150602085019450602081019050612a25565b86831015612a675784890151612a63601f891682612970565b8355505b6001600288020188555050505b505050505050565b6000602082019050612a916000830184612642565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f43726f776446756e64696e673a20416374696f6e207065726d6974746564207460008201527f6f20636f6e7472616374206f776e6572206f6e6c792e00000000000000000000602082015250565b6000612b226036836122fa565b9150612b2d82612ac6565b604082019050919050565b60006020820190508181036000830152612b5181612b15565b9050919050565b7f43726f776446756e64696e673a204f6e6c792074686520636f6e74726163742060008201527f6f776e6572206973207065726d6974746564207468697320616374696f6e2e00602082015250565b6000612bb4603f836122fa565b9150612bbf82612b58565b604082019050919050565b60006020820190508181036000830152612be381612ba7565b905091905056fea26469706673582212200f57e4024701fbfa635790520667a880b61628b2c973f71627fffaa3279a6d1964736f6c63430008110033";

type CrowdFundingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrowdFundingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CrowdFunding__factory extends ContractFactory {
  constructor(...args: CrowdFundingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CrowdFunding> {
    return super.deploy(overrides || {}) as Promise<CrowdFunding>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CrowdFunding {
    return super.attach(address) as CrowdFunding;
  }
  override connect(signer: Signer): CrowdFunding__factory {
    return super.connect(signer) as CrowdFunding__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrowdFundingInterface {
    return new utils.Interface(_abi) as CrowdFundingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CrowdFunding {
    return new Contract(address, _abi, signerOrProvider) as CrowdFunding;
  }
}
