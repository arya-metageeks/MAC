require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

// Load environment variables
const ARBITRUM_TESTNET_RPC = process.env.ARBITRUM_TESTNET_RPC;
const MASTER_PRIVATE_KEY = process.env.MASTER_PRIVATE_KEY;

// Encryption parameters
const ENCRYPTION_KEY = crypto.randomBytes(32); // Use a secure key (32 bytes for AES-256)
const IV_LENGTH = 16; // For AES, this is always 16

// Initialize provider and master wallet
const provider = new ethers.JsonRpcProvider(ARBITRUM_TESTNET_RPC);
const masterWallet = new ethers.Wallet(MASTER_PRIVATE_KEY, provider);

console.log(`Master Wallet Address: ${masterWallet.address}`);

// Function to encrypt a text (e.g., private key)
const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted text
};

// Function to generate new wallets
const generateWallets = (numOfWallets) => {
    const wallets = [];
    for (let i = 0; i < numOfWallets; i++) {
        const wallet = ethers.Wallet.createRandom(); // Generates a new random wallet
        wallets.push(wallet);
        console.log(`Generated Wallet ${i + 1}: ${wallet.address}`);

        // Securely store the wallet's private key
        const encryptedPrivateKey = encrypt(wallet.privateKey);
        storePrivateKey(wallet.address, encryptedPrivateKey); // Store encrypted private key
    }
    return wallets;
};

// Function to store private key securely
const storePrivateKey = (address, encryptedPrivateKey) => {
    const data = { address, encryptedPrivateKey };
    fs.writeFileSync('wallets.json', JSON.stringify(data, null, 2), { flag: 'a' }); // Append to the file
};

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

// Transfer $5 worth of ETH to each generated wallet
const transferFundsToWallets = async (wallets, amountInUSD) => {
    try {
        const ethPriceInUSD = await fetchEthPrice();
        console.log(`ethPriceInUSD: ${ethPriceInUSD}`);

        const ethAmount = (amountInUSD / ethPriceInUSD).toFixed(18);
        console.log(`ethAmount: ${ethAmount}`);

        for (const wallet of wallets) {
            try {
                const tx = await masterWallet.sendTransaction({
                    to: wallet.address,
                    value: ethers.parseEther(ethAmount)
                });
                console.log(`Sent $${amountInUSD} worth of ETH to ${wallet.address}, Transaction Hash: ${tx.hash}`);
                await tx.wait();
            } catch (error) {
                console.error(`Failed to send ETH to ${wallet.address}:`, error);
            }
        }
    } catch (error) {
        console.error('Error in transferring funds:', error.message);
    }
};

const DOMAIN_MINTING_ABI = [
    "function mintDomain(string memory domain) public",
    "function isDomainMinted(string memory domain) public view returns (bool)",
    "function getDomainOwner(string memory domain) public view returns (address)"
];

// DomainRegistry minting contract address
const DOMAIN_MINTING_ADDRESS = '0x933EcE0c294D2DBae18AfFB70D09CC6A0035507E';
const domainRegistry = new ethers.Contract(DOMAIN_MINTING_ADDRESS, DOMAIN_MINTING_ABI, provider);

// Generate a unique domain name for each wallet
const generateUniqueDomain = (walletAddress) => `domain-${walletAddress.slice(2, 10)}.fam`;

// Mint domains for each wallet
const mintDomains = async (wallets) => {
    try {
        for (const wallet of wallets) {
            const signer = wallet.connect(provider);  // Connect wallet to provider
            const domain = generateUniqueDomain(wallet.address);  // Generate domain

            const domainExists = await domainRegistry.isDomainMinted(domain);  // Check if domain exists
            if (!domainExists) {
                try {
                    const tx = await domainRegistry.connect(signer).mintDomain(domain);  // Mint domain
                    console.log(`Minted domain ${domain} for wallet ${wallet.address}, Transaction Hash: ${tx.hash}`);
                    await tx.wait();  // Wait for the transaction to confirm
                } catch (error) {
                    console.error(`Failed to mint domain ${domain} for wallet ${wallet.address}:`, error);
                }
            } else {
                console.log(`Domain ${domain} already exists. Skipping wallet ${wallet.address}`);
            }
        }
    } catch (error) {
        console.error(`Failed to mint domain:`, error.message);
    }
};

const main = async () => {
    const numOfWallets = 5;  // Step 1: Define number of wallets to generate
    const amountInUSD = 5; // Amount to transfer ($5)

    // Step 1: Generate wallets
    const wallets = generateWallets(numOfWallets);

    // Step 2: Transfer ETH to each wallet
    await transferFundsToWallets(wallets, amountInUSD);

    // Step 3: Mint unique domains for each wallet
    await mintDomains(wallets);

    console.log('All tasks completed successfully.');
};

main().catch((error) => {
    console.error('An error occurred in the main function:', error.message);
});
