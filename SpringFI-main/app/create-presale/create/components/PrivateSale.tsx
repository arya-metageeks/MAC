import { useFormContext } from "@/context/FormContext";
import React, { useContext, useState } from "react";
import Image from "next/image";
import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/InputComponents/CustomInput";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const PrivateSale: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const {
    routerSelect,
    setRouterSelect,
    whitelist,
    setWhitelist,
    infoData,
    setInfoData,
  } = useFormContext();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.softCap > 0 &&
      infoData.hardCap > 0 &&
      infoData.fundReleaseEachCycle > 0 &&
      infoData.firstReleasePercentage > 0 &&
      infoData.vestingPeriod > 0
    );
  };

  const handleWhitelistChange = (value: string) => {
    setWhitelist(value === "enable" ? true : false);
  };
  return (
    <>
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
        <CustomInput
          labelElement="SoftCap (ETH)*"
          id="softCap"
          name="softCap"
          type="number"
          className=""
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">SoftCap must be less than HardCap</p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="HardCap (ETH)*"
          id="hardCap"
          name="hardCap"
          type="number"
          className=""
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          HardCap must be greater than SoftCap
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Minimum buy (ETH)*"
          id="minimumBuy"
          name="minimumBuy"
          type="number"
          className=""
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Maximum buy (ETH)*"
          id="maximumBuy"
          name="maximumBuy"
          type="number"
          className=""
          onChange={handleOnChange}
          required
        />
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
      <div className="mb-4">
        <CustomInput
          labelElement="First Fund Release For Project (%)*"
          id="firstReleasePercentage"
          name="firstReleasePercentage"
          type="number"
          className=""
          defaultValue={0}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          First Fund Release must be less than 100%
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Fund Vesting Period Each Cycle (days)*"
          id="vestingPeriod"
          name="vestingPeriod"
          type="number"
          className=""
          defaultValue={1}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">
          Vesting Period must be greater than 0
        </p>
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Fund Release Each Cycle (percent)*"
          id="fundReleaseEachCycle"
          name="fundReleaseEachCycle"
          type="number"
          className=""
          defaultValue={0}
          onChange={handleOnChange}
          required
        />
        <p className="custom-label mt-1">Fund Release must be less than 100%</p>
      </div>
    </>
  );
};

export default PrivateSale;
