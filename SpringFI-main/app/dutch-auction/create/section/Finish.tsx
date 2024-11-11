import {
  ERC20Abi,
  dutchAuctionAbi,
  // dutchAuctionAddress,
} from "@/constants/Ethereum/createConstants";
const dutchAuctionAddress = "0xC27b80FD3Da9f701Fc6391E906c4787C66ff2292";
import React, { useContext, useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
// import { useNetwork } from "wagmi";
import axios from "@/constants/axio";
import Countdown from "react-countdown";
import { ethers } from "ethers";
// import FinishWrapper from "@/components/TailwindWrapper/FinishPage/bgFinish";
import { useFormContext } from "@/context/FormContext";
import { notifyError, notifySuccess } from "@/app/utils/notify";
import { toast } from "react-toastify";
import GlowingButton from "@/components/GlowingButton";

const EthereumFinish = () => {
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
    vesting,
  } = useFormContext();
  const allowanceValue = ethers.constants.MaxUint256.toString();
  const { writeContract } = useWriteContract({
    mutation: {
      onError: (e) => notifyError(e.message),
    },
  });
  const allowance = () => {
    writeContract({
      //@ts-ignore
      address: tokenAddress,
      abi: ERC20Abi,
      functionName: "approve",
      //change address here accordingly.
      args: [dutchAuctionAddress, allowanceValue],
    });
  };

  const { chain } = useAccount();

  const [fee, setFee] = useState<boolean>(false);
  const [refund, setRefund] = useState<boolean>(false);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000"
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

    updateRefundType(infoData.refundType);
  }, [currency, chain, altTokenAddress, feeOption, infoData.refundType]);

  const { data: altTokenAddressDecimals } = useReadContract({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;
  const createDutchAuction = () => {
    writeContract({
      address: dutchAuctionAddress,
      abi: dutchAuctionAbi,
      functionName: "createAuction",
      args: [
        tokenAddress,
        altTokenAddress,
        whitelist,
        refund,
        vesting.enabled,
        fee,
        infoData.tokensToSell * 10 ** tokenDetails.decimals,
        infoData.minContribution * 10 ** decimals,
        infoData.maxContribution * 10 ** decimals,
        infoData.decreasePriceCycle,
        infoData.startPrice * 10 ** decimals,
        infoData.endPrice * 10 ** decimals,
        Math.floor(new Date(infoData.startDate).getTime() / 1000),
        Math.floor(new Date(infoData.endDate).getTime() / 1000),
        infoData.liquidityPercent,
        infoData.liquidityLockup * 24 * 3600,
        infoData.tgereleasePercentage,
        infoData.cycle,
        infoData.cycleReleasePercentage,
      ],
    });
  };
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

  //❌ Length of Web3
  //🚀 Fair Launch

  //🚀 Auction

  const { data: returnLengthAuction } = useReadContract({
    address: dutchAuctionAddress,
    abi: dutchAuctionAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   notifyError(`Error creating presale ${error}`);
    // },
  });

  const dataLengthAuction: any = returnLengthAuction?.toString();

  const lengthAuction = parseInt(dataLengthAuction);

  const [web3Length, setWeb3Length] = useState(lengthAuction);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);
  useEffect(() => {
    if (web3Length < dataLengthAuction) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(dataLengthAuction);
  }, [dataLengthAuction]);

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
    description: string
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
      await axios.post("/dutchAuctionInfo", postData);
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
        dataLengthAuction,
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
        description
      );
      setButtonClicked(false);
    }
  }, [transactionPassed, buttonClicked]);
  const handleCombinedButtonClick = async () => {
    createDutchAuction();

    setWeb3Length(dataLengthAuction);

    setButtonClicked(true);
    setCountdownTime(Date.now() + 60000); // Update the countdown time
    const toastId = toast.loading(
      (t) => (
        <Countdown
          date={countdownTime}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              notifyError("Maybe something went wrong. Please try again.");
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
        // duration: 150000,
        style: {
          backgroundColor: "#242525",
          borderRadius: "10px",
          border: "1px solid #8f8c8c",
        },
      }
    );
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 150000);
  };
  return (
    <>
      {/* <FinishWrapper> */}
      <p className="flex justify-between">
        <span>TokenDetails:</span>
        <span>
          {tokenDetails.decimals}, {tokenDetails.name}, {tokenDetails.symbol}
        </span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Purchase Token Currency:</span> <span>{currency}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      {whitelist ? (
        <p className="flex justify-between">
          <span>Whitelist:</span> <span>Enabled</span>
        </p>
      ) : (
        <p className="flex justify-between">
          <span>Whitelist:</span> <span>Disabled</span>
        </p>
      )}
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Refund Type:</span> <span>{infoData.refundType}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>

      <p className="flex justify-between">
        <span>Fee:</span> <span>{feeOption}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Tokens To Sell:</span> <span>{infoData.tokensToSell}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Minimum Buy:</span> <span>{infoData.minContribution}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span> Maximum Buy:</span> <span> {infoData.maxContribution}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Decrease Price Cycle:</span>
        <span> {infoData.decreasePriceCycle} Minutes</span>
      </p>

      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Start Price:</span> <span> {infoData.startPrice} </span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>End Price:</span> <span>{infoData.endPrice}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>HardCap:</span>{" "}
        <span>{infoData.startPrice * infoData.tokensToSell}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>SoftCap:</span>
        <span>{infoData.endPrice * infoData.tokensToSell}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Start Time:</span>
        <span>{formattedStartDate}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>

      <p className="flex justify-between">
        <span>End Time:</span> <span>{formattedEndDate}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Liquidity:</span> <span> {infoData.liquidityPercent}% </span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Liquidity Lockup:</span>{" "}
        <span>{infoData.liquidityLockup} Days</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      {vesting.enabled ? (
        <div>
          <p className="flex justify-between">
            <span>First Release Percentage: </span>{" "}
            <span> {infoData.tgereleasePercentage.toString()}</span>
          </p>
          <hr className="border-b mt-8 mb-8 border-dashed border-white/10"></hr>
          <p className="flex justify-between">
            <span> Cycle Release Percentage: </span>{" "}
            <span> {infoData.cycleReleasePercentage.toString()}</span>
          </p>
          <hr className="border-b mt-8 mb-8 border-dashed border-white/10"></hr>
          <p className="flex justify-between">
            <span>Cycle:</span> <span>{infoData.cycle} Days</span>
          </p>
        </div>
      ) : (
        <div>
          <p>
            {" "}
            <span>Vesting :</span> <span>Disabled</span>
          </p>
        </div>
      )}
      <div className="flex justify-center gap-4 pt-8">
        <GlowingButton>
          <button
            className=""
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </button>
        </GlowingButton>
        <GlowingButton>
          <button
            className=""
            onClick={() => {
              handleCombinedButtonClick();
            }}
          >
            {" "}
            CREATE DUTCH AUCTION
          </button>
        </GlowingButton>
      </div>
      {/* </FinishWrapper> */}
    </>
  );
};

export default EthereumFinish;
