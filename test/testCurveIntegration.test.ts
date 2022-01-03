/* eslint-disable no-unused-expressions */
import { ethers } from "hardhat";
import { setup } from "./setup";
import chaiModule = require("./chai-setup");
const { expect } = chaiModule;

describe("Curve pool test (via TestCurveIntegration)", function () {
  it("Check deployment was correct", async () => {
    const { deployer } = await setup();

    // TestCurveIntegration should be the owner of TokenOne and TokenTwo
    const testCurveIntegrationAddress = deployer.testCurveIntegration.address;
    const tokenOneOwner = await deployer.tokenOne.owner();
    const tokenTwoOwner = await deployer.tokenTwo.owner();
    expect(tokenOneOwner).to.eq(testCurveIntegrationAddress);
    expect(tokenTwoOwner).to.eq(testCurveIntegrationAddress);

    // console.log("(await deployer.tokenOne.balanceOf(testCurveIntegrationAddress)).toString()");
    // console.log((await deployer.tokenOne.balanceOf(testCurveIntegrationAddress)).toString());
    // console.log("(await deployer.tokenTwo.balanceOf(testCurveIntegrationAddress)).toString()");
    // console.log((await deployer.tokenTwo.balanceOf(testCurveIntegrationAddress)).toString());
  });

  it("getPoolBalance", async () => {
    const { deployer } = await setup();

    expect(await deployer.testCurveIntegration.getPoolBalance(0)).to.eq(0);
    expect(await deployer.testCurveIntegration.getPoolBalance(1)).to.eq(0);
  });

  it("getLpToken", async () => {
    const { deployer } = await setup();

    expect(await deployer.testCurveIntegration.getLpToken()).not.to.be.null;
  });

  it("addLiquidity", async () => {
    const { deployer } = await setup();

    expect((await deployer.cryptoSwap.balances(0)).eq(0)).to.be.true;
    expect((await deployer.cryptoSwap.balances(1)).eq(0)).to.be.true;

    const oneUnit = ethers.utils.parseEther("1");
    await deployer.testCurveIntegration.addLiquidity(oneUnit);

    const halfUnit = oneUnit.div(2);
    expect((await deployer.cryptoSwap.balances(0)).eq(halfUnit)).to.be.true;
    expect((await deployer.cryptoSwap.balances(1)).eq(halfUnit)).to.be.true;
  });

  it("exchangeTokens", async () => {
    const { deployer } = await setup();

    const oneUnit = ethers.utils.parseEther("1");
    await deployer.testCurveIntegration.addLiquidity(oneUnit);

    const halfUnit = oneUnit.div(10);
    await deployer.testCurveIntegration.exchangeTokens(halfUnit);
  });
});
