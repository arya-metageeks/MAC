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
  const { chain } = useAccount();
  const { routerSelect, setRouterSelect } = useFormContext();
  const { infoData, setInfoData } = useFormContext();
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.tokensToSell > 0 &&
      infoData.softCap > 0 &&
      infoData.liquidityLockup > 0 &&
      infoData.liquidityAdditionPercent <= 100 &&
      infoData.liquidityAdditionPercent >= 50
    );
  };

  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const handleAffiliateChange = (value: boolean) => {
    setOpenAffiliate(value);
  };
  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined
  );

  const routerOptions = [{ value: "Uniswap", label: "Uniswap" }];

  const handleRouterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouter(e.target.value);
  };

  const { whitelist, setWhitelist } = useFormContext();

  const handleWhitelistChange = (value: string) => {
    if (value === "Enable") {
      setWhitelist(true);
    } else if (value === "Disable") {
      setWhitelist(false);
    }
  };

  // Define the labels for each router option
  const routerLabels: { [key: string]: string } = {
    Uniswap: "Uniswap",
    Apeswap: "Apeswap",
    MDex: "MDex",
    BiSwap: "BiSwap",
    PinkSwap: "PinkSwap",
    Babydogeswap: "Babydogeswap",
  };

  // Function to get the selected router label
  const getSelectedRouterLabel = () => {
    return selectedRouter ? routerLabels[selectedRouter] : "Router";
  };

  // Function to get the field label based on the selected router
  const getFieldLabel = (fieldName: string) => {
    return selectedRouter
      ? `${routerLabels[selectedRouter]} ${fieldName}`
      : `${fieldName}`;
  };
  return (
    <>
      <div>
        <div className="mb-4">
          <CustomInput
            id="tokensToSell"
            name="tokensToSell"
            onChange={handleOnChange}
            value={infoData?.tokensToSell}
            placeholder=""
            type="number"
            defaultValue={0}
            required
            labelElement="Total Selling Amount"
          />
          <p className="custom-label">
            Total selling amount cannot be blank and must be greater than 0
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="whitelist" className="custom-label">
            Whitelist
          </label>

          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <CustomCheckbox
                onChange={() => {
                  handleWhitelistChange("Disable");
                }}
                checked={!whitelist}
              />
              <label htmlFor="disableWhitelist" className="ml-2">
                Disable
              </label>
            </div>
            <div className="flex items-center">
              <CustomCheckbox
                checked={whitelist}
                onChange={() => {
                  handleWhitelistChange("Disable");
                }}
              />
              <label htmlFor="enableWhitelist" className="ml-2 ">
                Enable
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <CustomInput
            id="softCap"
            name="softCap"
            onChange={handleOnChange}
            type="number"
            className="mb-1"
            required
            labelElement={"Softcap (ETH)"}
          />
          <p className="custom-label">
            Softcap cannot be blank and must be greater than 0
          </p>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2 gap-2">
            <CustomCheckbox
              onChange={handleAffiliateChange}
              checked={openAffiliate}
            />
            <label htmlFor="default-checkbox" className="">
              Setting max contribution?
            </label>
          </div>
          {openAffiliate && (
            <CustomInput
              id="maxContribution"
              name="maxContribution"
              type="text"
              className=""
              placeholder="Ex: 10"
              onChange={handleOnChange}
              labelElement={"Max Contribution (ETH)"}
            />
          )}
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
            labelElement={getFieldLabel("liquidity (%)")}
            id="liquidityAdditionPercent"
            name="liquidityAdditionPercent"
            onChange={handleOnChange}
            type="number"
            className="mb-1"
            placeholder="Ex: 52"
          />
          <p className="custom-label">
            Liquidity cannot be blank and must be between 50% and 100%
          </p>
        </div>
        <div className="mb-4">
          <CustomInput
            id="startDate"
            name="startDate"
            onChange={handleOnChange}
            type="datetime-local"
            className="mb-1"
            labelElement="Start time (UTC)"
            required
          />
          <p className="custom-label">
            The duration between start time and end time must be less than 7
            days
          </p>
        </div>
        <div className="mb-4">
          <CustomInput
            id="endDate"
            name="endDate"
            onChange={handleOnChange}
            type="datetime-local"
            defaultValue={0}
            className="mb-1"
            labelElement="End time (UTC)"
            required
          />
          <p className="custom-label">
            The duration between start time and end time must be less than 7
            days
          </p>
        </div>

        <div className="mb-4">
          <CustomInput
            id="liquidityLockup"
            name="liquidityLockup"
            type="number"
            onChange={handleOnChange}
            placeholder="Ex: 30 days"
            className="mb-1"
            labelElement="Liquidity lockup (days)"
            required
          />
          <p className="custom-label">
            Liquidity lockup cannot be blank and must be greater than 0
          </p>
        </div>
      </div>
    </>
  );
};

export default DeFiLaunchpad;
