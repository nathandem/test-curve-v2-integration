// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.4;

/// @dev Interface like https://github.com/curvefi/curve-crypto-contract/blob/master/deployment-logs/2021-11-01.%20EURS%20on%20mainnet/CryptoSwap.vy
interface ICryptoSwap {
    function token() external view returns (address);

    function coins(uint256 i) external view returns (address);

    function get_virtual_price() external view returns (uint256);
    
    function balances(uint256 i) external view returns (uint256);

    // Swap token i to j with amount dx and min amount min_dy
    function exchange(
        uint256 i,
        uint256 j,
        uint256 dx,
        uint256 min_dy
    ) external returns (uint256);

    function get_dy(
        uint256 i,
        uint256 j,
        uint256 dx
    ) external returns (uint256);

    function add_liquidity(uint256[2] memory amounts, uint256 min_mint_amount) external returns (uint256);

    function remove_liquidity(uint256 _amount, uint256[2] memory min_amounts) external returns (uint256[2] memory);
}
