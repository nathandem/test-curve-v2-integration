import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = (await hre.getUnnamedAccounts())[0];

  console.log(`Current network is ${hre.network.name.toString()}`);

  const tokenOne = await ethers.getContract("TokenOne", deployer);
  const tokenTwo = await ethers.getContract("TokenTwo", deployer);
  const pool = await ethers.getContract("CryptoSwap", deployer);

  await hre.deployments.deploy("TestCurveIntegration", {
    from: deployer,
    args: [tokenOne.address, tokenTwo.address, pool.address],
    log: true,
  });
  console.log("We have deployed TestCurveIntegration");
};

func.tags = ["TestCurveIntegration"];
func.id = "create_test_curve_integration";
func.dependencies = ["CurvePool"];

export default func;
