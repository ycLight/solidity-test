const { expect } = require("chai");
const { abi } = require("../artifacts/contracts/Bank.sol/Bank.json")

describe("Bank contract", function () {
    let bank, owner, addr1;
    const provider = ethers.getDefaultProvider();

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        bank = await ethers.getContractAt(abi, "0x50536ab3348f695f91077cB1090D4bA2E2CFA639", owner);

    });

    describe("Deployment", function () {
        it("Test withdraw", async function () {

            // Before do withdraw 
            let balance = await bank.balances(await owner.getAddress())
            expect(balance).to.equal(ethers.utils.parseEther("100"));

            // After do withdraw 
            await bank.withdraw()
            balance = await bank.balances(await owner.getAddress())
            expect(balance).to.equal(ethers.utils.parseEther("0"));
        });
    });
});
