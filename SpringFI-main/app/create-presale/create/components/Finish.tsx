import { notifyError, notifySuccess } from "@/app/utils/notify";
import axios from "@/constants/axio";
import {
  ERC20Abi,
  createAddress,
  privSaleAbi,
  privSaleAddress,
} from "@/constants/Ethereum/createConstants";
import { useFormContext } from "@/context/FormContext";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import GlowingButton from "@/components/GlowingButton";
import { toast } from "react-toastify";
import { useRef } from "react";

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

  const { chain } = useAccount();
  const [fee, setFee] = useState<boolean>(false);
  const [refund, setRefund] = useState<boolean>(false);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000"
  );
  const [errors, setErrors] = useState<string>("");

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

  const { writeContract } = useWriteContract({
    mutation: {
      onError(error: any) {
        setErrors(error);
        notifyError(`Error creating priv sale ${error}`);
      },
    },
  });
  const handleAllowance = () => {
    writeContract({
      //@ts-ignore
      address: infoData.tok,
      abi: ERC20Abi,
      functionName: "approve",
      args: [createAddress, 10000000000000],
    });
  };

  const { data: altTokenAddressDecimals } = useReadContract({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;

  const handleCreatePrivateSale = () => {
    writeContract({
      address: privSaleAddress,
      abi: privSaleAbi,
      functionName: "createPrivSale",
      args: [
        altTokenAddress,
        whitelist,
        infoData.softCap * 10 ** decimals,
        infoData.hardCap * 10 ** decimals,
        infoData.minimumBuy * 10 ** decimals,
        infoData.maximumBuy * 10 ** decimals,
        Math.floor(new Date(infoData.startDate).getTime() / 1000),
        Math.floor(new Date(infoData.endDate).getTime() / 1000),
        infoData.firstReleasePercentage.toString(),
        infoData.vestingPeriod.toString(),
        infoData.fundReleaseEachCycle.toString(),
      ],
      // onError(error: any) {
      //   console.log("Error", error);
      //   enqueueSnackbar(`Error creating presale ${error}`, {
      //     variant: "error",
      //   });
      // },
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

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Presale
  const returnLengthFunctionQuery = useReadContract({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "returnLength",

    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });
  const returnLength = returnLengthFunctionQuery.data;
  const dataLengthPresales: any = returnLength?.toString();

  const lengthPresales = parseInt(dataLengthPresales);

  const [web3Length, setWeb3Length] = useState(lengthPresales);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 250000);
  const intervalRef = useRef<any>();

  useEffect(() => {
    if (web3Length < lengthPresales) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(lengthPresales);
  }, [lengthPresales]);

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
    title: string,
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
      title: title,
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
    console.log(postData);
    try {
      await axios.post("/privateSaleInfo", postData);

      notifySuccess("Data saved successfully");
    } catch (error: any) {
      notifyError(`${error.message}`);
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(
        lengthPresales,
        infoData.title,
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
    console.log("clicked");
    handleCreatePrivateSale();

    console.log("second");
    setWeb3Length(lengthPresales);
    console.log("third");
    setButtonClicked(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      returnLengthFunctionQuery.refetch();
    }, 4000);

    // setCountdownTime(Date.now() + 150000); // Update the countdown time
    // const toastId = toast.loading(
    //   (t: any) => (
    //     <Countdown
    //       date={countdownTime}
    //       renderer={({ hours, minutes, seconds, completed }) => {
    //         if (completed) {
    //           toast.error(
    //             <p>
    //               {" "}
    //               <p className="text-md font-bold text-gray-200">
    //                 Maybe something went wrong. Please try again.
    //               </p>
    //             </p>
    //           );
    //         }
    //         return (
    //           <div>
    //             <p className="text-md font-bold text-gray-200">
    //               After completing the transaction, wait for confirmation. Don’t
    //               refresh or close the page.
    //             </p>
    //             <p className="text-sm text-gray-200">
    //               Please wait!. This may take a few minutes/seconds. {hours}:
    //               {minutes}:{seconds}
    //             </p>
    //           </div>
    //         );
    //       }}
    //     />
    //   ),
    //   {
    //     style: {
    //       backgroundColor: "#242525",
    //       borderRadius: "10px",
    //       border: "1px solid #8f8c8c",
    //     },
    //   }
    // );
    // setTimeout(() => {
    //   toast.dismiss(toastId);
    // }, 150000);
  };
  return (
    <>
      <p className="flex justify-between">
        <span>Title: </span> <span>{infoData.title}</span>
      </p>

      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Purchase Token Currency: </span> <span>{currency}</span>
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
        <span>Hard Cap:</span> <span>{infoData.hardCap}</span>{" "}
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Minimum Buy:</span> <span>{infoData.minimumBuy}</span>{" "}
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Maximum Buy:</span> <span>{infoData.maximumBuy}</span>{" "}
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Start Time:</span>
        <span> {formattedStartDate}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        {" "}
        <span>End Time:</span> <span>{formattedEndDate}</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>First Fund Release For Project:</span>{" "}
        <span>{infoData.firstReleasePercentage}%</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span> Fund Vesting Period Each Cycle: </span>{" "}
        <span>{infoData.vestingPeriod} Days</span>
      </p>
      <hr className="border-b border-dashed border-white/10"></hr>

      <p className="flex justify-between">
        <span>Fund Release Each Cycle:</span>{" "}
        <span>{infoData.fundReleaseEachCycle}%</span>
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
              handleAllowance();
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
            CREATE PRIVATE SALE
          </button>
        </GlowingButton>
      </div>
    </>
  );
};

export default EthereumFinish;
