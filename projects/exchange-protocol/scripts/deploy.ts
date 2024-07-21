import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const WETH = "0x0cA45E0779FAE177F26f6abF459CF03d9B23D012";
  const OWNER = "0xBE378c3ecE3cbef11A3294E2c963349e9e646436";

  console.log("OWNER : ", OWNER);
  console.log("WETH : ", WETH);
  
  const networkName = network.name;

  // Sanity checks
  // if (networkName === "mainnet") {
  //   if (!process.env.KEY_MAINNET) {
  //     throw new Error("Missing private key, refer to README 'Deployment' section");
  //   }
  // } else if (networkName === "testnet") {
  //   if (!process.env.KEY_TESTNET) {
  //     throw new Error("Missing private key, refer to README 'Deployment' section");
  //   }
  // }

  // if (!config.PancakeRouter[networkName] || config.PancakeRouter[networkName] === ethers.constants.AddressZero) {
  //   throw new Error("Missing router address, refer to README 'Deployment' section");
  // }

  // if (!config.WBNB[networkName] || config.WBNB[networkName] === ethers.constants.AddressZero) {
  //   throw new Error("Missing WBNB address, refer to README 'Deployment' section");
  // }

  console.log("Deploying to network:", networkName);

  // Deploy PancakeZapV1
  // console.log("Deploying PancakeZap V1..");

  // const PancakeZapV1 = await ethers.getContractFactory("PancakeZapV1");

  // const pancakeZap = await PancakeZapV1.deploy(
  //   config.WBNB[networkName],
  //   config.PancakeRouter[networkName],
  //   config.MaxZapReverseRatio[networkName]
  // );

  // await pancakeZap.deployed();

  // console.log("PancakeZap V1 deployed to:", pancakeZap.address);

  console.log("Deploying PancakeZap V1..");

  const PancakeFactoryV2 = await ethers.getContractFactory("PancakeFactory");
  const pancakeFactoryV2 = await PancakeFactoryV2.deploy(OWNER);
  await pancakeFactoryV2.deployed();

  console.log("PancakeZap V1 FACTORY to:", pancakeFactoryV2.address);

  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await PancakeRouter.deploy(pancakeFactoryV2.address, WETH);

  await pancakeRouter.deployed();

  console.log("PancakeZap V1 ROUTER to:", pancakeRouter.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
