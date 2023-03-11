async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  // address:0x70f06F2606459A38A58Fb2aeAcf7344280B51c05
  await counter.deployed();

  console.log("Counter address:", counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
