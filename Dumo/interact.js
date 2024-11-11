require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');
const FAM_DOMAIN_MINTING_V1_ABI = require('./abiFam.json');
const PAYMENT_TOKEN_ABI = require('./abiToken.json');

// Load environment variables
const ARBITRUM_TESTNET_RPC = process.env.ARBITRUM_TESTNET_RPC;
const MASTER_PRIVATE_KEY = process.env.MASTER_PRIVATE_KEY;
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

// Initialize provider and master wallet
const provider = new ethers.JsonRpcProvider(ARBITRUM_TESTNET_RPC);
const masterWallet = new ethers.Wallet(MASTER_PRIVATE_KEY, provider);
const userWallet = new ethers.Wallet(USER_PRIVATE_KEY, provider);

console.log(`Master Wallet Address: ${masterWallet.address}`);

const FAM_DOMAIN_MINTING_V1 = '0xb329C3f3A194BDbEB49d230096c2d447A0009017';
const famDomainMintingV1 = new ethers.Contract(FAM_DOMAIN_MINTING_V1, FAM_DOMAIN_MINTING_V1_ABI, masterWallet);

const PAYMENT_TOKEN = '0x0E7140CD649C08149471163Eb894fdB5557f812f';
const paymentTokenContract = new ethers.Contract(PAYMENT_TOKEN, PAYMENT_TOKEN_ABI, masterWallet);

// Function to fetch ETH price in USD from CoinGecko
const fetchEthPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        return response.data.ethereum.usd;
    } catch (error) {
        console.error('Error fetching ETH price:', error);
        throw error;
    }
};

const localBlockchainData = async () => {
    const ethPriceInUSD = await fetchEthPrice();
    console.log("Price: ", ethPriceInUSD);

    const DOMAIN_MINT_FEE = ethers.formatEther(await famDomainMintingV1.DOMAIN_MINT_FEE());
    console.log("DOMAIN_MINT_FEE: ", DOMAIN_MINT_FEE);

    const ethAmount = (DOMAIN_MINT_FEE / ethPriceInUSD).toFixed(18);
    console.log(`ethAmount: ${ethAmount}`);

    // Fetching payment token address correctly
    const paymentTokenAddress = await famDomainMintingV1.paymentToken();
    console.log("Payment Token Address: ", paymentTokenAddress);
};

const calculateEthForUSD = async (usdAmount = 5) => {
    try {
        // Assuming fetchEthPrice() retrieves the current ETH price in USD
        const ethPriceInUSD = await fetchEthPrice();
        // console.log("Current ETH price in USD:", ethPriceInUSD);

        // Calculate the required ETH equivalent to the given USD amount
        const ethAmount = (usdAmount / ethPriceInUSD).toFixed(18); // 18 decimal places for precision in ETH
        console.log(`ETH equivalent for $${usdAmount} USD:`, ethAmount);

        // Convert ethAmount to a BigNumber for further use in contract interactions
        const ethAmountBN = ethers.parseEther(ethAmount.toString());
        console.log("ETH amount in wei (BigNumber format):", ethAmountBN.toString());

        // You can now use ethAmountBN in your contract interactions or send as a payment amount
        return ethAmountBN;

    } catch (error) {
        console.error("Error fetching or calculating ETH amount:", error);
    }
};

// Usage example:
// calculateEthForUSD(5).then(ethAmountBN => {
//     console.log("ETH amount required in wei for $5 USD:", ethAmountBN.toString());
//     // Further interactions using ethAmountBN...
// });

const minting = async () => {
    let txn;
    try {
        // Add master wallet to whitelist
        // txn = await famDomainMintingV1.connect(masterWallet).addFreeMintWhitelist(masterWallet.address)
        // await txn.wait();

        // Mint domain for master wallet
        // txn = await famDomainMintingV1.connect(masterWallet).freeMintDomain("example.com");
        // await txn.wait();

        // Check domain ownership
        let domainOwner = await famDomainMintingV1.getDomainOwner("example.com");
        console.log("domainOwner:", domainOwner);

        //Discount Price is 50%

        let price = await calculateEthForUSD();
        let discountPrice = price / 2n;
        console.log("discountPrice:", discountPrice.toString());

        // Approve the discountPrice in BigNumber format
        if (!paymentTokenContract) {
            throw new Error("paymentTokenContract is not initialized");
        }

        // Get current allowance
        const currentAllowance = await paymentTokenContract.allowance(userWallet.address, FAM_DOMAIN_MINTING_V1);
        console.log("Current allowance:", currentAllowance.toString());

        // Estimate gas limit
        // const estimatedGas = await paymentTokenContract.estimateGas.approve(FAM_DOMAIN_MINTING_V1, ethers.parseEther(discountPrice.toString()));
        // console.log("Estimated gas:", estimatedGas.toString());

        // Approve token
        txn = await paymentTokenContract.connect(userWallet).approve(FAM_DOMAIN_MINTING_V1, ethers.parseEther(discountPrice.toString()));
        const receipt = await txn.wait();
        console.log("Approval transaction successful");

        // Check if approval was successful
        const finalAllowance = await paymentTokenContract.allowance(userWallet.address, FAM_DOMAIN_MINTING_V1);
        console.log(`Current allowance after approval: ${finalAllowance.toString()}`);

        // Proceed with domain minting
        txn = await famDomainMintingV1.connect(userWallet).discountMintDomain("example.net");
        await txn.wait();
        console.log("Domain minting successful");

    } catch (error) {
        console.error("Error:", error);
        if (error.message.includes("Approval failed")) {
            console.error("Please check your wallet balance and ensure you've approved the contract.");
        }
    }
};

// localBlockchainData();
// minting();

calculateEthForUSD();
