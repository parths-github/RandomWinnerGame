const { ethers } = require("hardhat");
const {FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH} = require("../constants");

async function main() {
    const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");
    const RandomWinnerGame = await randomWinnerGame.deploy(
        VRF_COORDINATOR,
        LINK_TOKEN,
        KEY_HASH,
        FEE
    );

    await RandomWinnerGame.deployed();

    console.log(`RandomWinnerGame is deployed to: ${RandomWinnerGame.address}`);

    await sleep(30000);
    console.log("Sleeping...");
    await hre.run("verify:verify", {
        address: RandomWinnerGame.address,
        constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })