import {
  ERC20Abi,
  airdropAbi,
  // airdropAddress,
} from "@/constants/Ethereum/createConstants";
const airdropAddress = "0x9fcB9285b81e1D9cD9E0187Da6aE49BD43795d5b";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useReadContract, useWriteContract } from "wagmi";

import axios from "@/constants/axio";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import Image from "next/image";
import { useFormContext } from "@/context/FormContext";
import { notifyError, notifySuccess } from "@/app/utils/notify";
import { toast } from "react-toastify";
import CustomInput from "@/components/InputComponents/CustomInput";
import CustomTextarea from "@/components/InputComponents/CustomTextarea";
type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};
const BgInput = ({ children }: any) => {
  return <div>{children}</div>;
};
const CreateAirdropContent: React.FC<VerifyTokenProps> = ({
  onStepValidation,
}) => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>();
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const {
    tokenAddress,
    setTokenAddress,
    isAffiliateEnabled,
    setIsAffiliateEnabled,
    currency,
    setCurrency,
    feeOption,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
    selectedListingOption,
    setSelectedListingOption,
  } = useFormContext();
  const { writeContract } = useWriteContract({
    mutation: {
      onError: (error) => {
        notifyError(error.message);
      },
    },
  });
  const { infoData, setInfoData } = useFormContext();
  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setFeeOption(`5% ${event.target.value} raised only (Recommended)`);
  };

  const handleAffiliateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenAffiliate(event.target.value === "enable" ? true : false);
  };

  const handleAffiliateChangePercent = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAffiliateChangePercent(parseFloat(event.target.value));
  };

  const handleChangeTokenAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTokenAddress = event.target.value;
    const isValidFormat = /^0x[0-9A-Fa-f]+$/.test(inputTokenAddress);
    setTokenAddress(event.target.value);
    setIsValidAddress(isValidFormat);
  };

  const checkTokenAddressValidity = () => {
    if (tokenAddress.trim() === "") {
      setIsValidAddress(false);
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      return;
    }

    const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]{40}$/i.test(tokenAddress);
    console.log(isTokenAddressFormatValid, "isTokenAddressFormatValid");
    setIsValidAddress(isTokenAddressFormatValid);
    if (isTokenAddressFormatValid) {
      fetchTokenDetails();
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
    }
  };

  const { data: decimals } = useReadContract({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const { data: name } = useReadContract({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "symbol",
  });

  const fetchTokenDetails = async () => {
    if (decimals && name && symbol) {
      setTokenDetails({
        //@ts-ignore
        name: name,
        //@ts-ignore
        symbol: symbol,
        //@ts-ignore
        decimals: decimals,
      });

      setIsValidAddress(true);
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      setIsValidAddress(false);
    }
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && tokenAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    onStepValidation(isFormValid());
    setIsAffiliateEnabled(affiliateChangePercent);
    function parseInputData(inputData: string) {
      const lines = inputData.trim().split("\n");
      const addresses: string[] = [];
      const amounts: number[] = [];

      lines.forEach((line) => {
        const [addressStr, amountStr] = line.split(",");

        const cleanedAddress = addressStr.trim();
        const amount = parseFloat(amountStr);

       if (!isNaN(amount) && cleanedAddress) {
         // Validate amount and address
         addresses.push(cleanedAddress);
         amounts.push(amount);
       }
      });

      return { addresses, amounts };
    }
    const { addresses, amounts } = parseInputData(infoData.title);
    setAddresses(addresses);
    setAmounts(amounts);
  }, [
    isValidAddress,
    tokenAddress,
    onStepValidation,
    setIsAffiliateEnabled,
    affiliateChangePercent,
    infoData.title,
  ]);

  const { vesting, setVesting } = useFormContext();
  const handleVestingEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const enableVesting = event.target.value === "enable";

    if (enableVesting) {
      setVesting({
        ...vesting,
        enabled: true,
      });
    } else {
      setVesting({
        enabled: false,
        firstReleasePercentage: 0,
        vestingPeriod: 0,
        cycleReleasePercentage: 0,
      });
    }
  };

  const airdrop = () => {
    console.log({
      tokenAddress,
      addresses,
      amounts,
      lockuntil: Math.floor(new Date(infoData.lockUntil).getTime() / 1000),
      vesting: vesting.enabled,
      tgereleasePercentage: infoData.tgereleasePercentage,
      cycle: infoData.cycle,
      cycleReleasePercentage: infoData.cycleReleasePercentage,
    });
    writeContract({
      address: airdropAddress,
      abi: airdropAbi,
      functionName: "createAirdrop",
      args: [
        tokenAddress,
        addresses,
        amounts,
        Math.floor(new Date(infoData.lockUntil).getTime() / 1000),
        vesting.enabled,
        infoData.tgereleasePercentage,
        infoData.cycle,
        infoData.cycleReleasePercentage,
      ],
      // onError(error: any) {
      //   console.log("Error", error);
      //   notifyError(`Error getting airdrop set ${error}`);
      // },
    });
  };
  const allowanceValue = ethers.constants.MaxUint256.toString();

  const allowance = () => {
    writeContract({
      //@ts-ignore
      address: tokenAddress,
      abi: ERC20Abi,
      functionName: "approve",
      //change address here accordingly.
      args: [airdropAddress, allowanceValue],
      // onError(error: any) {
      //   console.log("Error", error);
      //   notifyError(`Error gettig allowance ${error}`);
      // },
    });
  };

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Fair Launch

  const returnLengthFunctionQuery = useReadContract({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   notifyError(`Error creating presale ${error}`);
    // },
  });

  const returnLength = returnLengthFunctionQuery.data;
  const dataLengthFair: any = returnLength?.toString();

  const lengthFair = parseInt(dataLengthFair);

  const [web3Length, setWeb3Length] = useState(lengthFair);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const intervalRef = useRef<any>();
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);

  // console.table({ lengthFair, web3Length, transactionPassed, buttonClicked });
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
    airDrop,
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
    airDrop: string,
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
      airdropTitle: airDrop,
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
      await axios.post("/airDropInfo", postData);
      notifySuccess("Data saved successfully");
    } catch (error) {
      notifyError("Some error occurred!!");
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  //Step - 1

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(
        lengthFair,
        airDrop,
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
    console.log("first");
    airdrop();
    console.log("second");
    setWeb3Length(lengthFair);

    setButtonClicked(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      returnLengthFunctionQuery.refetch();
    }, 4000);
    // setCountdownTime(Date.now() + 60000); // Update the countdown time
    // const toastId = toast.loading(
    //   (t) => (
    //     <Countdown
    //       date={countdownTime}
    //       renderer={({ hours, minutes, seconds, completed }) => {
    //         if (completed) {
    //           notifyError("Maybe something went wrong. Please try again.");
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
    <div>
      <>
        <CustomInput
          id="tokenAddress"
          name="Token address"
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={handleChangeTokenAddress}
          onBlur={checkTokenAddressValidity}
          required={true}
          className="mb-4"
          isValid={!isValidAddress && tokenAddress.trim() !== ""}
        />
        {isValidAddress && (
          <div className="mt-4">
            <p className="inputAlert">Name: {tokenDetails.name}</p>
            <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
            <p className="inputAlert">Decimals: {tokenDetails.decimals}</p>
          </div>
        )}
        {/* {!isValidAddress && tokenAddress.trim() === "" && (
            <div className="mt-4">
              <p className="inputAlert">Token address cannot be blank</p>
            </div>
          )} */}
        {/* {isValidAddress && (
            <div className="mt-4">
              <p className="inputAlert">Correct</p>
            </div>
          )} */}

        <CustomTextarea
          id="title"
          name="title"
          rows={20}
          placeholder="Insert allocation: separate with line breaks. Format: address,amount"
          onChange={handleOnChange}
          required
        />
        <CustomInput
          id="lockUntil"
          name="lockUntil"
          type="datetime-local"
          placeholder=""
          className="mb-4"
          onChange={handleOnChange}
          required
          labelElement={<strong>Lock until (UTC time)</strong>}
        />
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="vestingEnabled"
              name="vestingEnabled"
              value="enable"
              onChange={handleVestingEnableChange}
              className="form-radio ml-2"
            />

            <label
              htmlFor="vestingEnabled"
              className="ml-2 whitespace-nowrap custom-label"
            >
              Enable Vesting
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="vestingDisabled"
              name="vestingEnabled"
              value="disable"
              defaultChecked={true}
              onChange={handleVestingEnableChange}
              className="form-radio ml-2"
            />

            <label
              htmlFor="vestingDisabled"
              className="ml-2 whitespace-nowrap custom-label"
            >
              Disable Vesting
            </label>
          </div>
        </div>
        {vesting.enabled && (
          <div className="mt-10">
            <CustomInput
              id="tgeReleasePercentage"
              name="TGE Release percentage(%)"
              type="number"
              placeholder="Ex: 10"
              onChange={handleOnChange}
              required
            />
            <CustomInput
              id="cycle"
              name="Cycle (days)"
              type="number"
              placeholder="Ex: 10"
              onChange={handleOnChange}
              required
            />
            <CustomInput
              id="cycleReleasePercentage"
              name="Cycle Release percentage(%)"
              type="number"
              placeholder="Ex: 10"
              onChange={handleOnChange}
              required
            />
          </div>
        )}
        <div className="flex justify-start gap-4 pt-8">
          <button
            className="finishButton"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </button>
          <br />
          <button
            className="finishButton"
            onClick={async () => {
              handleCombinedButtonClick();
            }}
          >
            Airdrop
          </button>
        </div>
      </>
    </div>
  );
};

export default CreateAirdropContent;
