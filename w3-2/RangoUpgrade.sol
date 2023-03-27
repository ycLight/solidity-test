// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract RangoUpgrade is ERC20Upgradeable {
    function initialize() public initializer {
        __ERC20_init("Rango", "RG");
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
