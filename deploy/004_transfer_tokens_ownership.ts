import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = (await hre.getUnnamedAccounts())[0];

  const tokenOne = await ethers.getContract("TokenOne", deployer);
  const tokenTwo = await ethers.getContract("TokenTwo", deployer);
  const testCurveIntegration = await ethers.getContract(
    "TestCurveIntegration",
    deployer
  );

  await tokenOne.transferOwnership(testCurveIntegration.address);
  await tokenTwo.transferOwnership(testCurveIntegration.address);

  console.log(
    "We have transferred the ownership of the tokens to TestCurveIntegration"
  );
};

func.tags = ["TransferOwnership"];
func.id = "transfer_ownership";
func.dependencies = ["TestCurveIntegration"];

export default func;
