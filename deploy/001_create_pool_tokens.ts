import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = (await hre.getUnnamedAccounts())[0];

  console.log(`Current network is ${hre.network.name.toString()}`);

  await hre.deployments.deploy("TokenOne", {
    from: deployer,
    args: ["TokenOne", "TokenOne"],
    log: true,
  });
  console.log("We have deployed TokenOne");

  await hre.deployments.deploy("TokenTwo", {
    from: deployer,
    args: ["TokenTwo", "TokenTwo"],
    log: true,
  });
  console.log("We have deployed TokenTwo");
};

func.tags = ["PoolTokens"];
func.id = "deploy_pool_tokens";

export default func;
