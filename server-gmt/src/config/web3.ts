import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();

const rpcUrl = process.env.RPC_URL;
//console.log(rpcUrl);
if (rpcUrl === undefined) {
    throw new Error("RPC_URL is not provided");
}
export const web3 = new Web3(
    rpcUrl
);