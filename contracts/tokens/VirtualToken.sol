// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.4;

// contracts
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// interfaces
import {IVirtualToken} from "../interfaces/IVirtualToken.sol";

contract VirtualToken is IVirtualToken, ERC20, Ownable {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    function mint(uint256 amount) external override onlyOwner {
        _mint(owner(), amount);
    }

    function burn(uint256 amount) external override onlyOwner {
        _burn(owner(), amount);
    }
}
