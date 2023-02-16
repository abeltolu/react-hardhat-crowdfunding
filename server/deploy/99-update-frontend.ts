//THIS FILE IS OPTIONAL AND WAS ONLY INCLUDED TO GENERATE TYPES FOR THE NEXTJS FRONTEND CODE

import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";
import { ethers, getChainId } from "hardhat";
import { frontEndAbiFile, frontEndContractsFile, contractTypesFolder, frontEndTypesFolder } from "../hardhat.helper";

async function updateAbi() {
  const contract = await ethers.getContract("CrowdFunding");
  fs.writeFileSync(frontEndAbiFile, contract.interface.format(ethers.utils.FormatTypes.json) as string);
}

async function updateContractAddresses() {
  const contract = await ethers.getContract("CrowdFunding");
  const chainId = await getChainId();
  const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"));
  if (chainId.toString() in contractAddresses) {
    if (!contractAddresses[chainId.toString()].includes(contract.address)) {
      contractAddresses[chainId.toString()].push(contract.address);
    }
  } else {
    contractAddresses[chainId.toString()] = [contract.address];
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}

async function copyTypes() {
  fs.cpSync(contractTypesFolder, frontEndTypesFolder, { recursive: true });
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end...");
    await updateContractAddresses();
    await updateAbi();
    await copyTypes();
    console.log("Front end written!");
  }
};

func["tags"] = ["All", "FrontEnd"];
export default func;
