const hre = require("hardhat")

async function main() {

  // Deploy contract
  const owner = "0x2Ba1Bf6aB49c0d86CDb12D69A777B6dF39AB79D9";

  const PaymentToken = await ethers.getContractFactory("PaymentToken");
  const paymentToken = await PaymentToken.deploy(ethers.parseEther("1000000"));

  const paymentTokenAddress = await paymentToken.getAddress();
  console.log(`PaymentToken Address: ${paymentTokenAddress}`)

  const DomainContract = await ethers.getContractFactory("FamDomainMintingV1");
  const domainContract = await DomainContract.deploy();

  const domainContractAddress = await domainContract.getAddress();
  console.log(`DomainContract Address: ${domainContractAddress}`)

  await domainContract.initialize(paymentTokenAddress, owner, owner);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});