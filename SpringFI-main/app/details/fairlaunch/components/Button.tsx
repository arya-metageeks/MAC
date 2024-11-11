import { useWriteContract } from "wagmi";
import {
  fairLaunchAbi,
  fairLaunchAddress,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { useFormContext } from "@/context/FormContext";
import DetailContainer from "@/components/DetailContainer";

interface CardProps {
  createTokenAddress: string;
  userWalletAddress: string | undefined;
  argsValue: number;
  endTime: number;
  moneyRaised: number;
  softCapCurrency: number;
}

const Button: React.FC<CardProps> = ({
  createTokenAddress,
  userWalletAddress,
  argsValue,
  endTime,
  moneyRaised,
  softCapCurrency,
}) => {
  //WhiteList Function Call
  const { setInfoData, infoData } = useFormContext();
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  const { writeContract } = useWriteContract();

  const handleWhiteList = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "whitelistAddress",
      args: [argsValue, infoData.userWalletAddress],
      //    onError(error: any) {
      //      console.log("Error", error);
      //      enqueueSnackbar(`Error creating presale ${error}`, {
      //        variant: "error",
      //      });
      //    },
    });
  };

  //WhiteList Function Call
  const handleRefundInvestment = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "refundInvestment",
      args: [argsValue],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
  };
  const currentTime = Math.floor(Date.now() / 1000);

  //claimTokens Function Call

  const handleClaimTokens = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "claimTokens",
      args: [argsValue],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
  };

  //collectAffiliateCommission Function Call

  const handleCollectAffiliateCommission = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "collectAffiliateCommission",
      args: [argsValue],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
  };

  //handleAfterSale Function Call

  const handleAfterSale = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "handleAfterSale",
      args: [argsValue],
      //  onError(error: any) {
      //    console.log("Error", error);
      //    enqueueSnackbar(`Error creating presale ${error}`, {
      //      variant: "error",
      //    });
      //  },
    });
  };

  return (
    <DetailContainer>
      <>
        {createTokenAddress === userWalletAddress && currentTime < endTime ? (
          <>
            <input
              onChange={handleOnChange}
              id="userWalletAddress"
              name="userWalletAddress"
              type="text"
              placeholder="Ex:1000000000000000000"
              className="input"
            />

            <button
              className="finishButton mt-6"
              onClick={() => {
                handleWhiteList();
              }}
            >
              Whitelist
            </button>
          </>
        ) : null}
      </>
      <>
        {currentTime >= endTime && moneyRaised < softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              handleRefundInvestment();
            }}
          >
            Refund Investment
          </button>
        ) : null}
      </>
      <>
        {currentTime >= endTime && moneyRaised >= softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              handleClaimTokens();
            }}
          >
            Claim Tokens
          </button>
        ) : null}
      </>

      <>
        {currentTime >= endTime && moneyRaised >= softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              handleCollectAffiliateCommission();
            }}
          >
            Collect Affiliate Commission
          </button>
        ) : null}
      </>

      <>
        {createTokenAddress === userWalletAddress &&
        currentTime >= endTime &&
        moneyRaised >= softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              handleAfterSale();
            }}
          >
            Handle After Sale
          </button>
        ) : null}
      </>
    </DetailContainer>
  );
};

export default Button;
