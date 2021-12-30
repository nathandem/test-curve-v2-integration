import { ethers } from "hardhat";
import { setup } from "./setup";
import chaiModule = require("./chai-setup");
const { expect } = chaiModule;

describe("Curve pool test (via TestCurveIntegration)", function () {
  it("getPoolBalance", async () => {
    const { deployer } = await setup();

    expect(await deployer.testCurveIntegration.getPoolBalance(0)).to.eq(0);
    expect(await deployer.testCurveIntegration.getPoolBalance(1)).to.eq(0);
  });

  it("getLpToken", async () => {
    const { deployer } = await setup();

    console.log(
      "Lp tokens are",
      await deployer.testCurveIntegration.getLpToken()
    );
  });

  it("addLiquidity", async () => {
    const { deployer } = await setup();

    await deployer.testCurveIntegration.addLiquidity(
      ethers.utils.parseEther("1")
    );
  });

  it("exchangeTokens", async () => {
    const { deployer } = await setup();

    await deployer.testCurveIntegration.addLiquidity(
      ethers.utils.parseEther("1")
    );
    await deployer.testCurveIntegration.exchangeTokens(
      ethers.utils.parseEther("1")
    );
  });
});
