"use client";
import {
  ERC20Abi,
  createAddress,
  tokenLockAbi,
  tokenLockAddress,
  pinkLockAddress,
  pinkLockABI,
  fairLaunchAddress,
  fairLaunchAbi,
} from "@/constants/Ethereum/createConstants";
import { useFormContext } from "@/context/FormContext";
import { enqueueSnackbar } from "notistack";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useReadContract, useWriteContract } from "wagmi";
import axios from "@/constants/axio";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import Image from "next/image";
import { notifyError } from "@/app/utils/notify";
import CustomInput from "@/components/InputComponents/CustomInput";
import CustomCheckbox from "@/components/CustomCheckbox";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const Pinklock = () => {
  const [selectedToken, setSelectedToken] = useState<string>("Standard");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [checkBox2, setCheckBox2] = useState<boolean>(false);

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);
  const [isOwnerName, setOwnerName] = useState(false);
  const [lockdays, setLockdays] = useState<any>(0);

  const {
    tokenAddress,
    setTokenAddress,
    isAffiliateEnabled,
    setIsAffiliateEnabled,
    setCurrency,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
    infoData,
    setInfoData,
  } = useFormContext();

  const { writeContract } = useWriteContract();

  const handleAllowance = () => {
    writeContract({
      //@ts-ignore
      address: tokenAddress,
      abi: ERC20Abi,
      functionName: "approve",
      //change address here accordingly.
      args: [tokenLockAddress, 10000000000000],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating priv sale ${error}`, {
          variant: "error",
        });
      },
    });
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setFeeOption(`5% ${event.target.value} raised only (Recommended)`);
  };

  const handleAffiliateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenAffiliate(event.target.value === "enable" ? true : false);
  };
  const handleIsOwnerChange = (value: string) => {
    setOwnerName(value === "enable" ? true : false);
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

  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && tokenAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    setLockdays(
      infoData.lockUntil == "" ? infoData.tgePercent : infoData.lockUntil
    );
    setIsAffiliateEnabled(affiliateChangePercent);
  }, [
    isValidAddress,
    tokenAddress,
    affiliateChangePercent,
    setIsAffiliateEnabled,
    infoData.lockUntil,
    infoData.tgePercent,
  ]);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(event.target.checked);
  };
  const handleCheckBox2 = (value: string) => {
    setCheckBox2(value === "enable" ? true : false);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    isFormValid();
  };
  const isFormValid = (): boolean => {
    return infoData.softCap > 0;
  };

  const handleLock = () => {
    writeContract({
      address: tokenLockAddress,
      abi: tokenLockAbi,
      functionName: "lockTokens",
      args: [
        tokenAddress,
        checkBox ? infoData.owner : tokenAddress,
        infoData.title,
        infoData.amount * 10 ** 18,
        Math.floor(
          new Date(
            checkBox2 ? infoData.tgeDate : infoData.lockUntil
          ).getTime() / 1000
        ),
        checkBox2,
        infoData.tgePercent.toString(),
        infoData.cycleDays.toString(),
        infoData.cycleReleasePercent.toString(),
      ],
    });
  };
  const { data: returnLength } = useReadContract({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    // },
  });

  const dataLengthFair: any = returnLength?.toString();

  const lengthFair = parseInt(dataLengthFair);

  const [web3Length, setWeb3Length] = useState(lengthFair);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);

  useEffect(() => {
    if (web3Length < lengthFair) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(lengthFair);
  }, [lengthFair]);

  //❌ Function to save data to database
  const handleSave = async (id: number, title: string) => {
    const postData = {
      id: id,
      title: title,
    };
    try {
      await axios.post("/save-data-pinklock/", postData);
      toast.dismiss();
      toast.success("Data saved successfully");
    } catch (error: any) {
      notifyError(error.message);
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  //Step - 1

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(lengthFair, infoData.title);
      setButtonClicked(false);
    }
  }, [transactionPassed, buttonClicked]);
  const handleCombinedButtonClick = async () => {
    handleLock();

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
                </p>
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
      }
    );
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 150000);
  };

  return (
    <>
      <div className="mb-4">
        <CustomInput
          labelElement="Token address"
          id="tokenAddress"
          name="tokenAddress"
          placeholder=""
          type="text"
          className=""
          value={tokenAddress}
          onChange={handleChangeTokenAddress}
          onBlur={checkTokenAddressValidity}
          isValid={isValidAddress}
          errorMessage="Invalid/Network token address "
          required
        />

        {isValidAddress && (
          <div className="  mt-1">
            <p className="custom-label">Name: {tokenDetails.name}</p>
            <p className="custom-label">Symbol: {tokenDetails.symbol}</p>
            <p className="custom-label">Decimals: {tokenDetails.decimals}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <div>
          <label className="custom-label" htmlFor="affiliateProgram">
            Use another's owner?
          </label>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <CustomCheckbox
                checked={!isOwnerName}
                onChange={() => {
                  handleIsOwnerChange("disable");
                }}
              />
              <label htmlFor="affiliateProgram1">No</label>
            </div>
            <div className="flex items-center">
              <CustomCheckbox
                checked={isOwnerName}
                onChange={() => {
                  handleIsOwnerChange("enable");
                }}
              />
              <label htmlFor="affiliateProgram2">Yes</label>
            </div>
          </div>
        </div>
        {isOwnerName && (
          <div className="mt-4">
            <CustomInput
              id="owner"
              name="owner"
              type="text"
              required
              onChange={handleOnChange}
              placeholder="Ex: Enter the owner address"
              labelElement="Owner"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement={"Title*"}
          id="title"
          name="title"
          placeholder="Ex: My Lock"
          onChange={handleOnChange}
          type="text"
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement={"Amount*"}
          id="amount"
          name="amount"
          placeholder="Ex: Enter the amount of tokens to lock"
          onChange={handleOnChange}
          type="text"
          required
        />
      </div>

      <div className="mb-4">
        <div>
          <label className="custom-label" htmlFor="affiliateProgram">
            Implement Pink Anti-Bot System?
          </label>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <CustomCheckbox
                checked={!checkBox2}
                onChange={() => {
                  handleCheckBox2("disable");
                }}
              />
              <label htmlFor="affiliateProgram1">No</label>
            </div>
            <div className="flex items-center">
              <CustomCheckbox
                checked={checkBox2}
                onChange={() => {
                  handleCheckBox2("enable");
                }}
              />
              <label htmlFor="affiliateProgram2">Yes</label>
            </div>
          </div>
        </div>
        {checkBox2 && (
          <div>
            <div className="mt-4">
              <CustomInput
                id="tgeDate"
                name="tgeDate"
                type="datetime-local"
                required
                onChange={handleOnChange}
                placeholder="Ex: 0x000"
                labelElement="TGE Date (UTC time)*"
              />
            </div>
            <div className="mt-4">
              <CustomInput
                id="tgePercent"
                name="tgePercent"
                type="text"
                required
                onChange={handleOnChange}
                placeholder="0-100"
                labelElement="TGE Percent*"
              />
            </div>

            <div className="mt-4">
              <CustomInput
                id="cycleDays"
                name="cycleDays"
                type="text"
                required
                onChange={handleOnChange}
                placeholder="0-100"
                labelElement="Cycle (days)*"
              />
            </div>
            <div className="mt-4">
              <CustomInput
                id="cycleReleasePercent"
                name="cycleReleasePercent"
                type="text"
                required
                onChange={handleOnChange}
                placeholder="0-100"
                labelElement="Cycle Release Percent*"
              />
            </div>
          </div>
        )}
        {!checkBox2 && (
          <div className="mt-4">
            <CustomInput
              id="lockUntil"
              name="lockUntil"
              type="datetime-local"
              required
              onChange={handleOnChange}
              labelElement="Lock until (UTC time)*"
            />
          </div>
        )}

        <div className="flex justify-center gap-4 pt-8">
          <button
            className="finishButton"
            onClick={() => {
              handleAllowance();
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
            PINK LOCK
          </button>
        </div>
      </div>
    </>
  );
};

export default Pinklock;
