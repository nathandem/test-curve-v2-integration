/* eslint-disable no-unused-expressions */
import { ethers } from "hardhat";
import { setup } from "./setup";
import chaiModule = require("./chai-setup");
const { expect } = chaiModule;

describe("Curve pool test (via TestCurveIntegration)", function () {
  const oneUnit = ethers.utils.parseEther("1");
  const halfUnit = oneUnit.div(2);

  it("Check deployment was correct", async () => {
    const { deployer } = await setup();

    // addresses
    const testCurveIntegrationAddress = deployer.testCurveIntegration.address;
    const tokenOneAddress = deployer.tokenOne.address;
    const tokenTwoAddress = deployer.tokenTwo.address;

    // TestCurveIntegration should be the owner of TokenOne and TokenTwo
    const tokenOneOwner = await deployer.tokenOne.owner();
    const tokenTwoOwner = await deployer.tokenTwo.owner();
    expect(tokenOneOwner).to.eq(testCurveIntegrationAddress);
    expect(tokenTwoOwner).to.eq(testCurveIntegrationAddress);

    // TokenOne should be the 1st coin in the pool, TokenTwo the 2nd one
    const firstCoin = await deployer.cryptoSwap.coins(0);
    const secondCoin = await deployer.cryptoSwap.coins(1);
    expect(firstCoin).to.eq(tokenOneAddress);
    expect(secondCoin).to.eq(tokenTwoAddress);

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

    await deployer.testCurveIntegration.addLiquidity(oneUnit);

    expect((await deployer.cryptoSwap.balances(0)).eq(halfUnit)).to.be.true;
    expect((await deployer.cryptoSwap.balances(1)).eq(halfUnit)).to.be.true;
  });

  it("addLiquidityTwice", async () => {
    const { deployer } = await setup();

    expect((await deployer.cryptoSwap.balances(0)).eq(0)).to.be.true;
    expect((await deployer.cryptoSwap.balances(1)).eq(0)).to.be.true;

    await deployer.testCurveIntegration.addLiquidity(oneUnit);
    await deployer.testCurveIntegration.addLiquidity(oneUnit);

    expect((await deployer.cryptoSwap.balances(0)).eq(oneUnit)).to.be.true;
    expect((await deployer.cryptoSwap.balances(1)).eq(oneUnit)).to.be.true;
  });

  it("exchangeTokens", async () => {
    const { deployer } = await setup();

    await deployer.testCurveIntegration.addLiquidity(oneUnit);

    const lpTokensReceived = await deployer.testCurveIntegration.exchangeTokens(
      halfUnit
    );
    expect(lpTokensReceived).not.to.be.null;
  });
});
