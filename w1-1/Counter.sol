// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Counter {
    uint256 public num;

    constructor() public {
        num = 0;
    }

    function add(uint256 value) external {
        num = num + value;
    }
}
