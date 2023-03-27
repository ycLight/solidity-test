const { expect } = require("chai");
const { abi: vaultAbi } = require("../artifacts/contracts/Vault.sol/Vault.json")
const { abi: tokenAbi } = require("../artifacts/contracts/Rango.sol/Rango.json")

describe("Token contract", function () {
    let owner;
    let vault;
    let token;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        vault = await ethers.getContractAt(vaultAbi, "0x54241C05c98F021cec7c590A66bbEF9eF7DCda88", owner);
        token = await ethers.getContractAt(tokenAbi, "0x2282E265D3708E786D64d0013492b2CD66621073", owner);
    })

    describe("Init", async function () {
        const to = "0x5d9F878D18Bb0Ea60C8B25FD5d6F0F2C19B929d6"
        const amount = ethers.BigNumber.from(10).pow(18).mul(20).toString()

        // it("Transfer", async function () {
        //     // await token.transfer(to, amount)
        //     // let iface = new ethers.utils.Interface(tokenAbi);
        //     // const data = iface.encodeFunctionData("transfer", [to, amount])

        //     const { data } = await token.populateTransaction.transfer(to, amount);

        //     // const data = iface.encodeFunctionData("transfer", [to, ethers.utils.parseEther("20.0")])
        //     // const limit = await provider.estimateGas({
        //     //     from: signer.address,
        //     //     to: tokenContract,
        //     //     value: ethers.utils.parseUnits("0.000", "ether"),
        //     //     data: data

        //     // });
        //     // const data = token.interface.encodeFunctionData("transfer", [to, amount])

        //     const tx = await owner.sendTransaction({
        //         to: token.address,
        //         from: owner.address,
        //         data: data,
        //         value: ethers.utils.parseUnits("0.000", "ether")
        //     })
        //     const receipt = await tx.wait();

        //     console.log(`Mined in block ${receipt.blockNumber}`);
        //     const balance = await token.balanceOf(to)
        //     console.log(balance)
        //     expect(balance.toString()).to.equal("130000000000000000000");
        // });

        // it("Approve", async function () {
        //     const wallet = new ethers.Wallet("0xe7413ac64c6b91329224bc946d7350f3ee42bbc6675679d618866351e0dfdd8c")
        //     const { data } = await token.populateTransaction.approve(to, amount);
        //     const tx = await wallet.signTransaction({
        //         to: token.address,
        //         from: owner.address,
        //         data: data,
        //         value: ethers.utils.parseUnits("0.000", "ether")
        //     })

        //     console.log(ethers.utils.parseTransaction(tx))
        //     const balance = await token.balanceOf(to)
        //     expect(balance.toString()).to.equal("130000000000000000000");
        // });

        // it("Deposit", async function () {
        //     await token.approve(vault.address, amount)
        //     await vault.deposit(amount)
        //     // console.log(await vault.balances(owner.address))
        //     expect(await vault.balances(owner.address)).to.equal(amount);
        // });

        it("PermitDeposit", async function () {
            const deadline = ethers.constants.MaxUint256
            const { v, r, s } = await getPermitSignature(
                owner,
                token,
                vault.address,
                amount,
                deadline
            )
            await vault.permitDeposit(amount, deadline, v, r, s)
            expect(await vault.balances(owner.address)).to.equal(ethers.BigNumber.from(10).pow(18).mul(20).toString());
        });

    })

})

async function getPermitSignature(signer, token, spender, value, deadline) {
    const [nonce, name, version, chainId] = await Promise.all([
        token.nonces(signer.address),
        token.name(),
        "1",
        signer.getChainId(),
    ])

    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name,
                version,
                chainId,
                verifyingContract: token.address,
            },
            {
                Permit: [
                    {
                        name: "owner",
                        type: "address",
                    },
                    {
                        name: "spender",
                        type: "address",
                    },
                    {
                        name: "value",
                        type: "uint256",
                    },
                    {
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        name: "deadline",
                        type: "uint256",
                    },
                ],
            },
            {
                owner: signer.address,
                spender,
                value,
                nonce,
                deadline,
            }
        )
    )
}