import React, { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useFormContext } from "@/context/FormContext";
import CustomInput from "@/components/InputComponents/CustomInput";
import CustomCheckbox from "@/components/CustomCheckbox";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const DeFiLaunchpad: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect } = useFormContext();
  const { infoData, setInfoData } = useFormContext();
  const { chain } = useAccount();
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.hardCap > 0 &&
      infoData.softCap > 0 &&
      infoData.hardCapTokenPerUser > 0 &&
      infoData.subRate > 0 &&
      infoData.listingRate > 0 &&
      infoData.liquidityAdditionPercent > 0 &&
      infoData.liquidityUnlockTime > 0
    );
  };
  const { whitelist, setWhitelist } = useFormContext();

  const handleWhitelistChange = (value: string) => {
    setWhitelist(value === "enable" ? true : false);
  };

  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const handleAffiliateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOpenAffiliate(event.target.checked);
  };
  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined
  );

  const routerOptions = [
    { value: "Pancakeswap", label: "Pancakeswap" },
    { value: "Apeswap", label: "Apeswap" },
    { value: "MDex", label: "MDex" },
    { value: "BiSwap", label: "BiSwap" },
    { value: "PinkSwap", label: "PinkSwap" },
    { value: "Babydogeswap", label: "Babydogeswap" },
  ];

  const handleRouterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouter(e.target.value);
  };

  // Define the labels for each router option
  const routerLabels: { [key: string]: string } = {
    Pancakeswap: "Pancakeswap",
    Apeswap: "Apeswap",
    MDex: "MDex",
    BiSwap: "BiSwap",
    PinkSwap: "PinkSwap",
    Babydogeswap: "Babydogeswap",
  };

  // Function to get the selected router label
  const getSelectedRouterLabel = () => {
    return selectedRouter ? routerLabels[selectedRouter] : "Router*";
  };

  // Function to get the field label based on the selected router
  const getFieldLabel = (fieldName: string) => {
    return selectedRouter
      ? `${routerLabels[selectedRouter]} ${fieldName}`
      : `${fieldName}*`;
  };
  return (
    <>
      <div className="mb-4">
        <CustomInput
          labelElement="HardCap Tokens*"
          id="hardCap"
          name="hardCap"
          type="number"
          className=""
          defaultValue={0}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          HardCap Tokens must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="SoftCap Tokens*"
          id="softCap"
          name="softCap"
          type="number"
          defaultValue={0}
          className=""
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          {" "}
          SoftCap Tokens must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="HardCap Token Per User*"
          id="hardCapTokenPerUser"
          name="hardCapTokenPerUser"
          type="number"
          defaultValue={0}
          className=""
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          {" "}
          HardCap Token Per User must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Subscription rate*"
          id="subRate"
          name="subRate"
          type="number"
          className=""
          placeholder="Ex: 10"
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          {" "}
          Subscription rate must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Listing rate*"
          id="listingRate"
          name="listingRate"
          type="number"
          className=""
          placeholder="Ex: 10"
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">Listing rate must be greater than 0</p>
      </div>
      <div className="mb-4">
        <label className="custom-label mt-1" htmlFor="wishlist">
          Wishlist*
        </label>
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex items-center">
            <CustomCheckbox
              checked={!whitelist}
              onChange={() => {
                handleWhitelistChange("disable");
              }}
            />
            <label htmlFor="affiliateProgram1">Disable Affiliate</label>
          </div>
          <div className="flex items-center">
            <CustomCheckbox
              checked={whitelist}
              onChange={() => {
                handleWhitelistChange("enable");
              }}
            />
            <label htmlFor="affiliateProgram2">Enable Affiliate</label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="countries" className="custom-label">
          {getSelectedRouterLabel()}
        </label>
        <select
          id="router"
          name="router"
          value={selectedRouter}
          onChange={handleRouterChange}
          className="custom-input rounded-none"
        >
          <option value="">---Select Router Exchange---</option>
          {routerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Liquidity Percent(%)*"
          id="liquidityAdditionPercent"
          name="liquidityAdditionPercent"
          type="number"
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          {" "}
          Liquidity Percent(%) must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="countries" className="custom-label">
          Refund type *
        </label>
        <select
          id="refundType"
          name="refundType"
          onChange={handleOnChange}
          className="custom-input rounded-none"
        >
          <option value="Burn">Burn</option>
          <option value="Refund">Refund</option>
        </select>
        <p className="custom-label mt-1"> Refund type must be selected</p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Liquidity lockup (days)*"
          id="liquidityUnlockTime"
          name="liquidityUnlockTime"
          type="number"
          defaultValue={0}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          {" "}
          Liquidity lockup (days) must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Start time (UTC)*"
          id="startDate"
          name="startDate"
          type="datetime-local"
          className=""
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="End time (UTC)*"
          id="endDate"
          name="endDate"
          type="datetime-local"
          className=""
          defaultValue={0}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          End time must be greater then start time
        </p>
      </div>
    </>
  );
};

export default DeFiLaunchpad;
