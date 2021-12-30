import { ethers, deployments, getUnnamedAccounts } from "hardhat";
import {
  TokenOne,
  TokenTwo,
  ICryptoSwap,
  TestCurveIntegration,
} from "../typechain";
import { Contract } from "ethers";

async function setupUsers<T extends { [contractName: string]: Contract }>(
  addresses: string[],
  contracts: T
): Promise<({ address: string } & T)[]> {
  const users: ({ address: string } & T)[] = [];
  for (const address of addresses) {
    users.push(await setupUser(address, contracts));
  }
  return users;
}

async function setupUser<T extends { [contractName: string]: Contract }>(
  address: string,
  contracts: T
): Promise<{ address: string } & T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = { address };
  for (const key of Object.keys(contracts)) {
    user[key] = contracts[key].connect(await ethers.getSigner(address));
  }
  return user as { address: string } & T;
}

export const setup = deployments.createFixture(async () => {
  await deployments.fixture("TransferOwnership");

  const contracts = {
    tokenOne: <TokenOne>await ethers.getContract("TokenOne"),
    tokenTwo: <TokenTwo>await ethers.getContract("TokenTwo"),
    cryptoSwap: <ICryptoSwap>await ethers.getContract("CryptoSwap"),
    testCurveIntegration: <TestCurveIntegration>(
      await ethers.getContract("TestCurveIntegration")
    ),
  };

  const deployer = (await getUnnamedAccounts())[0];
  const users = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    users,
    deployer: await setupUser(deployer, contracts),
  };
});
