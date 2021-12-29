// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.4;

import {ICryptoSwap} from "./interfaces/ICryptoSwap.sol";
import {IVirtualToken} from "./interfaces/IVirtualToken.sol";

contract TestCurveIntegration {
    ICryptoSwap public market;
    IVirtualToken public tokenOne;
    IVirtualToken public tokenTwo;

    constructor(
        IVirtualToken _tokenOne,
        IVirtualToken _tokenTwo,
        ICryptoSwap _curvePool
    ) {
        tokenOne = _tokenOne;
        tokenTwo = _tokenTwo;
        market = _curvePool;

        // approve all future transfers between TestCurveIntegration and market
        tokenOne.approve(address(market), type(uint256).max);
        tokenTwo.approve(address(market), type(uint256).max);
    }

    function getPoolBalance(uint256 _tokenIndex) external view returns(uint256) {
        return market.balances(_tokenIndex);
    }

    function getLpToken() external view returns(address) {
        return market.token();
    }

    function addLiquidity(uint256 _amount) external returns(uint256) {
        // create tokens to be supplied to pool
        tokenOne.mint(_amount);
        tokenTwo.mint(_amount);
        // supply liquidity to pool
        uint256 min_mint_amount = 0;
        uint256[2] memory mint_amounts = [_amount, _amount];
        uint256 newLpTokens = market.add_liquidity(mint_amounts, min_mint_amount);
        
        // value returned for tests
        return newLpTokens;
    }

    function exchangeTokens(uint256 _amount) external returns(uint256) {
        uint256 firstCoin = 1;
        uint256 secondCoin = 0;
        uint256 nbOfTokensReceived = market.exchange(firstCoin, secondCoin, _amount, 0);

        return nbOfTokensReceived;
    }
}