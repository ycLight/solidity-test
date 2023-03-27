// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    // const RangoUpgrade = await ethers.getContractFactory("RangoUpgrade");
    // const rangoUpgrade = await upgrades.deployProxy(RangoUpgrade, []);
    // await rangoUpgrade.deployed();
    // console.log("Box deployed to:", rangoUpgrade.address);

    const RangoUpgradeV2 = await ethers.getContractFactory("RangoUpgradeV2");
    const rangoUpgradeV2 = await upgrades.upgradeProxy("0xEDC73d856C3F2cC50a83a7d852ACB137df9b1288", RangoUpgradeV2);
    console.log("Box upgraded");
}

main();