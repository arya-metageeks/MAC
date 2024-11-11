const { ethers } = require('ethers')
require('dotenv').config();


// Load environment variables
const ARBITRUM_TESTNET_RPC = process.env.ARBITRUM_TESTNET_RPC;
const MASTER_PRIVATE_KEY = process.env.MASTER_PRIVATE_KEY;

// Initialize provider and master wallet
const provider = new ethers.JsonRpcProvider(ARBITRUM_TESTNET_RPC);
const masterWallet = new ethers.Wallet(MASTER_PRIVATE_KEY, provider);

const DOMAIN_MINTING_ABI = [
    "function mintDomain(string memory domain) public",
    "function isDomainMinted(string memory domain) public view returns (bool)",
    "function getDomainOwner(string memory domain) public view returns (address)"
];

const DOMAIN_MINTING_ADDRESS = '0x933EcE0c294D2DBae18AfFB70D09CC6A0035507E';
const domainRegistry = new ethers.Contract(DOMAIN_MINTING_ADDRESS, DOMAIN_MINTING_ABI, provider);

/**
 * Minted domain domain-630bdDa1.fam for wallet 0x630bdDa14aA8797e444418Df0a9723FCaf27Daaf, Transaction Hash: 0x037630edcfada737935cdb77f3157683afc510a9f54218f6af2a3747dd9e8c1f
 * Minted domain domain-eC95C76A.fam for wallet 0xeC95C76A8ac2e1e713CE20570174E5907175Dc81, Transaction Hash: 0x9d5c4f37dc33add6e489e666e540cbb6c0d225b2cd46e0a026c8436c81da6f54
 * Minted domain domain-F24E102D.fam for wallet 0xF24E102D16AC57375f439d3e65E6651e3c778914, Transaction Hash: 0x4cb8638eae634091c92ab5eb0a886d5d5f8d71b563e2560bad746b93c9858d88
 * Minted domain domain-5796A148.fam for wallet 0x5796A1489d6351aaa3311a0EfCed5aC10B7fcF3E, Transaction Hash: 0xa8114d38980cc46c98d14e84c406e9fffca8444b7fc44d7eda138ae8112217bb
 * Minted domain domain-2f036ee5.fam for wallet 0x2f036ee5C41509BdC7BA5db674456Edee249B4DF, Transaction Hash: 0x320ba81980fd7ef9296c5e2873b6577e7645713ba3cd97b3e3398a59f2297688 
*/

// Minted domain domain-cb6F7C25.fam for wallet 0xcb6F7C25c8DcA172b548a33c1943f1B84b83087B, Transaction Hash: 0xbbd178bd7e0fa066ee601a70082ab7c835c075b330d2b34867f467d585b883b8
// Minted domain domain-B23A1C57.fam for wallet 0xB23A1C5797899bb96234097279A78683A0D3F783, Transaction Hash: 0xbaf1a5fb4d9ccbf1260ca8c2c915c6b9948b9b860ef5d875f9d9252f446fdbb0
// Minted domain domain-07eD2331.fam for wallet 0x07eD2331e623aB7d1A635A6547d05FB655Da04bc, Transaction Hash: 0xb45fe6472432cc94cd2cfb9bfce71b7186d6aa6ba18b3f076911f4c452210283
// Minted domain domain-3959500f.fam for wallet 0x3959500f11b9E05B4CD641A84DEB58Ae7AD4D037, Transaction Hash: 0x8a25093f28df017373b0ddbe056b385188ebbbc0faedbe86a6c548d7437bde88
// Minted domain domain-9cA61cE1.fam for wallet 0x9cA61cE150201DcC51f2B323954Cb6acACAb270D, Transaction Hash: 0xe49a7df82f9423655901a83796c430577a0b31a361f58509e81165b939450b0a
const interaction = async () => {
    const domains = [
        'domain-cb6F7C25.fam',
        'domain-B23A1C57.fam',
        'domain-07eD2331.fam',
        'domain-3959500f.fam',
        'domain-9cA61cE1.fam'
    ];
    try {
        for (const domain of domains) {
            const isMinted = await domainRegistry.isDomainMinted(domain);
            console.log(`Is domain minted: ${isMinted}`);

            if (isMinted) {
                const getDomainOwner = await domainRegistry.getDomainOwner(domain);
                console.log(`${domain} Owner: ${getDomainOwner}`);
            } else {
                console.log(`The domain ${domain} has not been minted.`);
            }
        }
    } catch (error) {
        console.error("Error fetching domain owner:", error);
        // Additional logging for debugging
        if (error.error && error.error.data) {
            console.error("Error Data:", error.error.data);
        }
        if (error.code) {
            console.error("Error Code:", error.code);
        }
        if (error.reason) {
            console.error("Error Reason:", error.reason);
        }
    }
};

interaction();

