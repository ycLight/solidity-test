const { expect } = require("chai");
// const {abi} = require("../artifacts/contracts/Score.sol/Score.json")
const { abi } = require("../artifacts/contracts/Score.sol/Teacher.json")

describe("Score contract", function () {
    let owner;
    let addr1;
    let Teacher;
    let teacher;
    let Score;
    let score;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // score = await ethers.getContractAt(abi, "0xF41916879770843bD22BaddcF7C2516555556827", owner);
        // teacher = await ethers.getContractAt(abi, "0x8bFF5112839143804e86301C847D378942525CEd", owner);

        Score = await ethers.getContractFactory("Score");
        score = await Score.deploy();
        await score.deployed();

        // Teacher = await ethers.getContractFactory("Teacher");
        // teacher = await Teacher.deploy();
        // await teacher.deployed();
    })

    describe("Deployment", async function () {

        it("Test createTeacher & update score", async function () {
            await score.createTeacher(await owner.getAddress())
            const teacherAddress = await score.teachers(await owner.getAddress())
            teacher = await ethers.getContractAt(abi, teacherAddress, owner);
            await teacher.updateScore(score.address, "0xD5e3Ce061481Eac3A184483B3D6c9fC39a5E9802", 100)
            const result = await score.score("0xD5e3Ce061481Eac3A184483B3D6c9fC39a5E9802")
            expect(result).to.equal(100);
        });
    })
})