// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Rango is ERC20Permit {
    constructor(
        uint256 initialSupply
    ) ERC20("Rango", "RG") ERC20Permit("Rango") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
