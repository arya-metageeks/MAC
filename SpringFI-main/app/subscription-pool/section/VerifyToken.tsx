import { ERC20Abi } from "@/constants/PolygonMumbai/createConstants";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import Image from "next/image";
import { useFormContext } from "@/context/FormContext";
import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/InputComponents/CustomInput";
const BgInput = ({ children }: any) => {
  return <>{children}</>;
};
type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const VerifyToken: React.FC<VerifyTokenProps> = ({ onStepValidation }) => {
  const { chain } = useAccount();

  const [isValidAddress, setIsValidAddress] = useState(false);
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
  } = useFormContext();

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setFeeOption(`5% ${value} raised only (Recommended)`);
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

  const { data: decimals } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const { data: name } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
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
    onStepValidation(isFormValid());
    setIsAffiliateEnabled(affiliateChangePercent);
  }, [
    isValidAddress,
    tokenAddress,
    onStepValidation,
    affiliateChangePercent,
    setIsAffiliateEnabled,
  ]);

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
        <label className="custom-label mb-2 block" htmlFor="currency">
          Currency
        </label>
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex items-center">
            <CustomCheckbox
              checked={currency === "ETH"}
              onChange={(isChecked) => {
                isChecked && handleCurrencyChange("ETH");
              }}
            />
            <label className="ml-2" htmlFor="maticCurrency">
              ETH
            </label>
          </div>
          <div className="flex items-center">
            <CustomCheckbox
              checked={currency === "USDT"}
              onChange={(isChecked) => {
                isChecked && handleCurrencyChange("USDT");
              }}
            />
            <label className="ml-2" htmlFor="usdtCurrency">
              USDT
            </label>
          </div>
          <div className="flex items-center">
            <CustomCheckbox
              checked={currency === "USDC"}
              onChange={(isChecked) => {
                isChecked && handleCurrencyChange("USDC");
              }}
            />
            <label className="ml-2" htmlFor="usdcCurrency">
              USDC
            </label>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Users will pay with {currency} for your token
        </p>
      </div>
      <div className="mb-4">
        <p className="flex">
          <label className="custom-label mb-2 block" htmlFor="feeOptions">
            Fee Options
          </label>
        </p>
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex items-center">
            <CustomCheckbox
              checked={feeOption === `5% ${currency} raised only (Recommended)`}
              onChange={() =>
                setFeeOption(`5% ${currency} raised only (Recommended)`)
              }
            />
            <label className="ml-2 whitespace-nowrap" htmlFor="feeOption1">
              5% {currency} raised only (Recommended)
            </label>
          </div>
          <div className="flex items-center">
            <CustomCheckbox
              checked={feeOption === `2% ${currency} + 2% token sold`}
              onChange={() => setFeeOption(`2% ${currency} + 2% token sold`)}
            />
            <label className="ml-2 whitespace-nowrap" htmlFor="feeOption2">
              2% {currency} + 2% token sold
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyToken;