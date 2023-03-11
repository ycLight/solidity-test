// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
import "hardhat/console.sol";

contract Counter {
    uint256 public num;
    address owner;

    modifier onlyOwner(uint256 value) {
        console.log("solidity output:",value);
        require(msg.sender == owner && value > 0, "only owner");
        _;
    }

    constructor() public {
        num = 0;
        owner = msg.sender;
    }

    function add(uint256 value) onlyOwner(value) external {
        num = num + value;
    }

}
