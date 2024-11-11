import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import Image from "next/image";
import { useFormContext } from "@/context/FormContext";
import { useAccount } from "wagmi";
import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/InputComponents/CustomInput";

interface PrivateSale {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const BgInput = ({ children }: any) => {
  return <div className="mb-8">{children}</div>;
};

const BeforeYouStart: React.FC<PrivateSale> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { chain } = useAccount();
  const { infoData, setInfoData, currency, setCurrency } = useFormContext();
  // Add a new state to hold the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return infoData.title !== "";
  };

  const getCurrencyText = (): string => {
    switch (selectedCurrency) {
      case "MATIC":
        return "Users will pay with MATIC for your token";
      case "USDT":
        return "Users will pay with USDT for your token";
      case "USDC":
      default:
        return "Users will pay with USDC for your token";
    }
  };

  return (
    <>
      <div className="mb-4">
        <CustomInput
          labelElement="Title"
          id="title"
          name="title"
          placeholder="This is pre-sale of the token"
          type="text"
          className=""
          value={infoData.title}
          onChange={handleOnChange}
          required
        />
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
    </>
  );
};

export default BeforeYouStart;
