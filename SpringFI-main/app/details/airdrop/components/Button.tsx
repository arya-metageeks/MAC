import { useAccount, useWriteContract } from "wagmi";
import {
  airdropAbi,
  airdropAddress,
  dutchAuctionAbi,
  dutchAuctionAddress,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { useFormContext } from "@/context/FormContext";
import { writeContract } from "viem/actions";
import GlowingButton from "@/components/GlowingButton";

interface CardProps {
  argsValue: number;
}

const Button: React.FC<CardProps> = ({ argsValue }) => {
  const { address, isConnected } = useAccount();
  //WhiteList Function Call

  const { setInfoData, infoData } = useFormContext();
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  const { writeContract } = useWriteContract();

  const handleClaimTokens = () => {
    writeContract({
      address: airdropAddress,
      abi: airdropAbi,
      functionName: "claim",
      args: [argsValue],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
  };

  return (
    <div className="mx-auto flex justify-center items-center mt-4">
      <GlowingButton>
        <button
          className="flex justify-start "
          onClick={() => {
            handleClaimTokens();
          }}
        >
          Claim Tokens
        </button>
      </GlowingButton>
    </div>
  );
};

export default Button;
