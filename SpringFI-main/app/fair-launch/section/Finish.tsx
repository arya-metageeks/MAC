import {
  ERC20Abi,
  fairLaunchAbi,
  fairLaunchAddress,
} from "@/constants/Sepolia/createConstants";
import React, { use, useContext, useEffect, useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import axios from "@/constants/axio";
import { toast as toastify, ToastContainer, toast } from "react-toastify";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import { useFormContext } from "@/context/FormContext";
import { notifyError, notifySuccess } from "@/app/utils/notify";
import GlowingButton from "@/components/GlowingButton";

const Finish = () => {
  const {
    tokenAddress,
    isAffiliateEnabled,
    currency,
    feeOption,
    tokenDetails,
    refundType,
    routerSelect,
    infoData,
    whitelist,
  } = useFormContext();
  const {writeContract} = useWriteContract({mutation:{
    onError:(e)=>notifyError(e.message)
  }})
  const allowanceValue = ethers.constants.MaxUint256.toString();

  const allowance = ()=>writeContract({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [fairLaunchAddress, allowanceValue],
  });

  const { chain } = useAccount();
  const [fee, setFee] = useState<boolean>(false);
  const [refund, setRefund] = useState<boolean>(false);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000",
  );
  useEffect(() => {
    function updateAltTokenAddress(x: string, altTokenAddress: string): string {
      if (currency == "USDC" && x == "Polygon") {
        setAltTokenAddress("0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359");
      } else if (currency === "USDT" && x === "Polygon") {
        setAltTokenAddress("0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
      }

      if (currency == "USDT" && x == "Avalanche") {
        setAltTokenAddress("0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7");
      } else if (currency == "USDC" && x == "Avalanche") {
        setAltTokenAddress("0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E");
      }

      if (currency == "USDT" && x == "Arbitrum One") {
        setAltTokenAddress("0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9");
      } else if (currency == "USDC" && x == "Arbitrum One") {
        setAltTokenAddress("0xaf88d065e77c8cC2239327C5EDb3A432268e5831");
      }

      if (currency == "USDT" && x == "Ethereum") {
        setAltTokenAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");
      } else if (currency == "USDC" && x == "Ethereum") {
        setAltTokenAddress("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
      }

      return altTokenAddress;
    }

    if (chain) {
      updateAltTokenAddress(chain.name, altTokenAddress);
    }

    function updateFeeOption(x: string) {
      if (x == `2% ${currency} + 2% token sold`) {
        setFee(true);
      } else {
        setFee(false);
      }
    }

    updateFeeOption(feeOption);

    function updateRefundType(x: string) {
      if (x == "Refund") {
        setRefund(true);
      } else {
        setRefund(false);
      }
    }

    updateRefundType(refundType);
  }, [currency, chain, altTokenAddress, feeOption, refundType]);
  const { data: altTokenAddressDecimals } = useReadContract({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;
  const  createFairLaunch  = ()=>{
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "createLaunch",
      args: [
        tokenAddress,
        altTokenAddress,
        whitelist,
        fee,
        infoData.softCap * 10 ** decimals,
        infoData.tokensToSell * 10 ** tokenDetails.decimals,
        infoData.maxContribution * 10 ** decimals,
        Math.floor(new Date(infoData.startDate).getTime() / 1000),
        Math.floor(new Date(infoData.endDate).getTime() / 1000),
        isAffiliateEnabled.toString(),
        infoData.liquidityAdditionPercent,
        infoData.liquidityLockup * 24 * 60 * 60,
      ]
    });
  }
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");

  useEffect(() => {
    if (infoData.startDate) {
      const startDate = new Date(infoData.startDate);
      const formattedStartDateTime =
        startDate.getFullYear() +
        "-" +
        ("0" + (startDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + startDate.getDate()).slice(-2) +
        "/" +
        ("0" + startDate.getHours()).slice(-2) +
        ":" +
        ("0" + startDate.getMinutes()).slice(-2);
      setFormattedStartDate(formattedStartDateTime);
    }

    if (infoData.endDate) {
      const endDate = new Date(infoData.endDate);
      const formattedEndDateTime =
        endDate.getFullYear() +
        "-" +
        ("0" + (endDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + endDate.getDate()).slice(-2) +
        "/" +
        ("0" + endDate.getHours()).slice(-2) +
        ":" +
        ("0" + endDate.getMinutes()).slice(-2);
      setFormattedEndDate(formattedEndDateTime);
    }
  }, [infoData.startDate, infoData.endDate]);

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Fair Launch

  const { data: returnLengthFair } = useReadContract({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });

  const dataLengthFair: any = returnLengthFair?.toString();

  const lengthFair = parseInt(dataLengthFair);

  const [web3Length, setWeb3Length] = useState(lengthFair);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);


  // Define a function to show an error notification

  useEffect(() => {
    if (web3Length < lengthFair) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(lengthFair);
  }, [lengthFair]);

  //❌ Data Retrieval

  const {
    logoUrl,
    bgLogoUrl,
    websiteUrl,
    facebook,
    twitter,
    github,
    instagram,
    discord,
    reddit,
    youtube,
    description,
  } = useFormContext();

  //❌ Function to save data to database
  const handleSave = async (
    id: number,
    logoUrl: string,
    bgLogoUrl: string,
    websiteUrl: string,
    facebook: string,
    twitter: string,
    github: string,
    instagram: string,
    discord: string,
    reddit: string,
    youtube: string,
    description: string,
  ) => {
    const postData = {
      id: id,
      logoUrl: logoUrl,
      bgLogoUrl: bgLogoUrl,
      websiteUrl: websiteUrl,
      facebook: facebook,
      twitter: twitter,
      github: github,
      instagram: instagram,
      discord: discord,
      reddit: reddit,
      youtube: youtube,
      description: description,
    };
    try {
      await axios.post("/fairLaunchInfo/Ethereum", postData);
      // toast.dismiss();
      notifySuccess("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  //Step - 1

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(
        lengthFair,
        logoUrl,
        bgLogoUrl,
        websiteUrl,
        facebook,
        twitter,
        github,
        instagram,
        discord,
        reddit,
        youtube,
        description,
      );
      setButtonClicked(false);
    }
  }, [transactionPassed, buttonClicked]);
  const handleCombinedButtonClick = async () => {
    createFairLaunch();

    setWeb3Length(lengthFair);

    setButtonClicked(true);

    setCountdownTime(Date.now() + 60000); // Update the countdown time
    const toastId = toast.loading(
      (t) => (
        <Countdown
          date={countdownTime}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              toast.error(
                <p>
                  {" "}
                  <p className="text-md font-bold text-gray-200">
                    Maybe something went wrong. Please try again.
                  </p>
                </p>,
                // { id: t.id },
              );
            }
            return (
              <div>
                <p className="text-md font-bold text-gray-200">
                  After completing the transaction, wait for confirmation. Don’t
                  refresh or close the page.
                </p>
                <p className="text-sm text-gray-200">
                  Please wait!. This may take a few minutes/seconds. {hours}:
                  {minutes}:{seconds}
                </p>
              </div>
            );
          }}
        />
      ),
      {
        style: {
          backgroundColor: "#242525",
          borderRadius: "10px",
          border: "1px solid #8f8c8c",
        },
      },
    );
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 150000);
  };

  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
        <p className="flex justify-between">
          <span>TokenDetails: </span>{" "}
          <span>
            {tokenDetails.decimals}, {tokenDetails.name}, {tokenDetails.symbol}{" "}
          </span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        {whitelist ? (
          <p className="flex justify-between">
            <span>Whitelist:</span> <span> Enabled</span>
          </p>
        ) : (
          <p className="flex justify-between">
            <span>Whitelist:</span> <span> Disabled</span>
          </p>
        )}
        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Soft Cap:</span> <span>{infoData.softCap}</span>{" "}
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Purchase Token Currency:</span> <span>{currency}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Fee:</span> <span>{feeOption}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>

        <p className="flex justify-between">
          <span> Token To Sell:</span> <span>{infoData.tokensToSell}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Max Buy:</span> <span>{infoData.maxContribution}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Start Time:</span> <span>{formattedStartDate}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>End Time:</span> <span>{formattedEndDate}</span>{" "}
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Affiliate Rate:</span>
          <span> {isAffiliateEnabled}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          {" "}
          <span>Liquidity:</span>{" "}
          <span>{infoData.liquidityAdditionPercent}%</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          {" "}
          <span>Liquidity Lockup:</span>
          <span> {infoData.liquidityLockup} Days</span>
        </p>

        <div className="flex justify-center gap-4 pt-8">
          <GlowingButton>
            <button
            className="finishButton"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </button>
          </GlowingButton>
         <GlowingButton>
           <button
            className="finishButton"
            onClick={() => {
              handleCombinedButtonClick();
            }}
          >
            {" "}
            FAIR LAUNCH
          </button>
         </GlowingButton>
        </div>
    </>
  );
};

export default Finish;
