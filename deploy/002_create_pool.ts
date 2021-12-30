import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { utils } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = (await hre.getUnnamedAccounts())[0];

  // owner: address,
  // admin_fee_receiver: address,
  // A: uint256,
  // gamma: uint256,
  // mid_fee: uint256,
  // out_fee: uint256,
  // allowed_extra_profit: uint256,
  // fee_gamma: uint256,
  // adjustment_step: uint256,
  // admin_fee: uint256,
  // ma_half_time: uint256,
  // initial_price: uint256

  await hre.deployments.deploy("CryptoSwap", {
    from: deployer,
    args: [
      deployer /* owner */,
      deployer /* admin_fee_receiver */,
      5000 * 2 ** 2 * 10000 /* A */,
      utils.parseEther("0.0001") /*  gamma */,
      utils.parseEther("0.0005") /*  mid_fee */,
      utils.parseEther("0.0045") /*  out_fee */,
      utils.parseUnits("10", 10) /*  allowed_extra_profit */,
      utils.parseEther("0.005") /*  fee_gamma */,
      utils.parseEther("0.0000055") /*  adjustment_step */,
      utils.parseUnits("5", 9) /*  admin_fee */,
      600 /*  ma_half_time */,
      utils.parseEther("1.2") /*  initial_price */,
    ],
    log: true,
  });

  console.log("We have deployed the curve pool");
};

func.tags = ["CurvePool"];
func.id = "create_curve_pool";
func.dependencies = ["PoolTokens"];

export default func;
