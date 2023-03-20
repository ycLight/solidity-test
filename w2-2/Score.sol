// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

interface IScore {
    function updateScore(address student, uint fraction) external;
}

contract Teacher {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function updateScore(address score, address student, uint fraction) public {
        // IScore(score).updateScore(student, fraction);
        score.delegatecall(
            abi.encodeWithSignature(
                "updateScore(address student, uint fraction)",
                student,
                fraction
            )
        );
    }
}

contract Score {
    mapping(address => uint) public score;
    mapping(address => address) public teachers;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner!");
        _;
    }

    modifier onlyTeacher() {
        require(teachers[msg.sender] != address(0x00), "Only teacher!");
        _;
    }

    function updateScore(address student, uint fraction) public onlyTeacher {
        score[student] = fraction;
    }

    function createTeacher(address teacher) public onlyOwner {
        bytes memory bytecode = type(Teacher).creationCode;
        bytes memory salt = abi.encodePacked(bytecode, abi.encode());
        teachers[teacher] = address(new Teacher{salt: bytes32(salt)}(teacher));
    }
}
