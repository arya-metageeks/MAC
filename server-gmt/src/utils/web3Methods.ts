import { addParticipantsAbi } from "./abi";
import { addParticipantsContractAddress } from "../config/constant";
import { web3 } from "../config/web3";
import dotenv from "dotenv";
dotenv.config();

const ownerAddress = process.env.OWNER_ADDRESS;
const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;

const addParticipantsContract = new web3.eth.Contract(addParticipantsAbi, addParticipantsContractAddress);

// const playerAddresses = [
//     "0x5e4C0A0b59C2f526F49a83A6D2861e90Ed03E5e4",
//     "0x7381dcdd88Cf0Deb052ef5dd7040Fe98e31d6F93",
// ];
// const updateData = [
//     { tornamentId: "582gdu83", headshot: 5, kills: 5 },
//     { tornamentId: "jgaua6718", headshot: 8, kills: 3 },
// ];

export const sendTransaction = async (playerAddresses: string[], updateData: { tournamentId: string, headshot: number, kills: number, score: number }[]) => {
    if (ownerAddress === undefined || ownerPrivateKey === undefined) {
        throw new Error("Owner address or private key is not provided");
    }

    const encodedData = addParticipantsContract.methods
        .batchUpdate(playerAddresses, updateData)
        .encodeABI();

    try {
        const gas = await addParticipantsContract.methods
            .batchUpdate(playerAddresses, updateData)
            .estimateGas({ from: ownerAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const txObject = {
            from: ownerAddress,
            to: addParticipantsContractAddress,
            data: encodedData,
            gas: gas,
            gasPrice: gasPrice,
        };
        const signedTx = await web3.eth.accounts.signTransaction(
            txObject,
            ownerPrivateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );
        console.log("Transaction receipt:", receipt.transactionHash.toString());
        return receipt.transactionHash.toString();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// sendTransaction()
//     .then(() => console.log("Transaction sent successfully"))
//     .catch((error) => console.error("Error sending transaction:", error));

