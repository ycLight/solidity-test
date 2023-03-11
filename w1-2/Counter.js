const { expect } = require("chai");

describe("Counter contract", function () {
  let Counter;
  let counter;
  let owner;
  let addr1;
  let addrs;

  beforeEach(async function () {
    Counter = await ethers.getContractFactory("Counter");
    [owner, addr1, ...addrs] = await ethers.getSigners();

    // console.log(await signer.getBalance())
    // console.log(await owner.getBalance())
    // console.log(await owner.getChainId())

    counter = await Counter.deploy();
    await counter.deployed();

  });

  describe("Deployment", function () {
    it("Test add func", async function () {
      // counter = counter.connect(addr1)
      await counter.add(10)
      const num = await counter.num()
      expect(num).to.equal(10);
    });
  });
});
