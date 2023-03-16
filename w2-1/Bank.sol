// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Bank {
    mapping(address => uint) public balances;

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public{
        address payable account = payable(msg.sender);
        (bool success,) = account.call{value: balances[msg.sender]}(new bytes(0));
        require(success, "Eth transfer failed!");
        balances[msg.sender] = 0;
    }

}
