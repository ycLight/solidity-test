// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
// import "hardhat/console.sol";

contract Vault {
    mapping(address => uint) public balances;
    address public constant token = 0x2282E265D3708E786D64d0013492b2CD66621073;

    // constructor(address _token){
    //     token = _token
    // }

    receive() external payable {}

    fallback() external payable {}

    function deposit(uint amount) public payable {
        // console.log("solidity output:", amount);
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed!"
        );
        balances[msg.sender] += amount;
    }

    function permitDeposit(
        uint amount,
        uint deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        IERC20Permit(token).permit(
            msg.sender,
            address(this),
            amount,
            deadline,
            v,
            r,
            s
        );
        deposit(amount);
    }

    function withdraw(uint value) public payable {
        require(balances[msg.sender] > value, "Insufficient balance!");
        address payable account = payable(msg.sender);
        uint balance = balances[msg.sender];
        balances[msg.sender] -= value;
        // 注意重入攻击
        (bool success, ) = account.call{value: balance}(new bytes(0));
        require(success, "Eth transfer failed!");
    }
}
