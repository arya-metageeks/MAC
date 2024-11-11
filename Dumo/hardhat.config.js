require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


const { ARBITRUM_TESTNET_RPC, MASTER_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    arbitrumTestnet: {
      url: ARBITRUM_TESTNET_RPC,
      accounts: [`${MASTER_PRIVATE_KEY}`], // Ensure this is prefixed with '0x'
    },
  },
};
