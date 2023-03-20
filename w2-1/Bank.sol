// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Bank {
    mapping(address => uint) public balances;

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public{
        address payable account = payable(msg.sender);
        uint balance  = balances[msg.sender];
        balances[msg.sender] = 0;
        // 注意重入攻击
        (bool success,) = account.call{value: balance}(new bytes(0));
        require(success, "Eth transfer failed!");
    }

}
