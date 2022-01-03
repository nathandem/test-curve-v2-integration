import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = (await hre.getUnnamedAccounts())[0];

  // deploy Curve LP Token
  await hre.deployments.deploy("CurveTokenV5", {
    from: deployer,
    args: ["testPoolLpToken", "TESTPOOLLPTOKEN"],
    log: true,
  });

  // deploy CryptoSwap
  const tokenOne = await ethers.getContract("TokenOne", deployer);
  const tokenTwo = await ethers.getContract("TokenTwo", deployer);
  const curveLPtoken = await ethers.getContract("CurveTokenV5", deployer);

  const FEE_RECEIVER = "0xeCb456EA5365865EbAb8a2661B0c503410e9B347"; // from: https://github.com/curvefi/curve-crypto-contract/blob/f66b0c7b33232b431a813b9201e47a35c70db1ab/scripts/deploy_mainnet_eurs_pool.py#L18
  await hre.deployments.deploy("CryptoSwap", {
    from: deployer,
    args: [
      deployer /* owner*/,
      FEE_RECEIVER /* admin_fee_receiver*/,
      BigNumber.from(5000)
        .mul(2 ** 2)
        .mul(10000) /* A */,
      utils.parseEther("0.0001") /*  gamma*/,
      utils.parseEther("0.0005") /*  mid_fee*/,
      utils.parseEther("0.0045") /*  out_fee*/,
      utils.parseUnits("10", 10) /*  allowed_extra_profit*/,
      utils.parseEther("0.005") /*  fee_gamma*/,
      utils.parseEther("0.0000055") /*  adjustment_step*/,
      utils.parseUnits("5", 9) /*  admin_fee*/,
      BigNumber.from(600) /*  ma_half_time*/,
      utils.parseEther("1") /*  initial_price*/, // TODO: dont hardcode initial price
      curveLPtoken.address,
      [tokenOne.address, tokenTwo.address],
    ],
    log: true,
  });

  const cryptoSwap = await ethers.getContract("CryptoSwap", deployer);

  // transfer minter role to curve pool
  await curveLPtoken.set_minter(cryptoSwap.address);

  console.log("We have deployed the curve pool");
};

func.tags = ["CurvePool"];
func.id = "create_curve_pool";
func.dependencies = ["PoolTokens"];

export default func;
