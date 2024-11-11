// import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";
// import { useNetwork } from "wagmi";
import { useFormContext } from "@/context/FormContext";
import CustomCheckbox from "@/components/CustomCheckbox";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const BgInput = ({ children }: any) => {
  return <div className="mb-5">{children}</div>;
};
const DeFiLaunchpad: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect, infoData, setInfoData } =
    useFormContext();
  // const { chain } = useNetwork();
  const chain = { name: "Ethereum" };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

  };
  useEffect(()=>{
    onStepValidation(isFormValid());
  },[infoData])
  const isFormValid = (): boolean => {
    return (
      infoData.tokensToSell > 0 &&
      infoData.startPrice > 0 &&
      infoData.endPrice > 0 &&
      infoData.minContribution > 0 &&
      infoData.maxContribution > 0 &&
      infoData.decreasePriceCycle > 0 &&
      infoData.liquidityPercent > 0 &&
      infoData.liquidityLockup > 0
    );
  };

  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined
  );

  const { vesting, setVesting } = useFormContext();

  const handleVestingEnableChange = (
    value:string
  ) => {
    const enableVesting = value === "enable";

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

  const { whitelist, setWhitelist } = useFormContext();

  const handleWhitelistChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "Enable") {
      setWhitelist(true);
    } else if (value === "Disable") {
      setWhitelist(false);
    }
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

  const [softCap, setSoftCap] = useState<number>(0);
  const [hardCap, setHardCap] = useState<number>(0);

  useEffect(() => {
    const calculateCaps = () => {
      const tokensToSell = parseFloat(String(Number(infoData.tokensToSell)));
      const startPrice = parseFloat(String(infoData.startPrice));
      const endPrice = parseFloat(String(infoData.endPrice));
      if (!isNaN(tokensToSell) && !isNaN(startPrice) && !isNaN(endPrice)) {
        setSoftCap(tokensToSell * endPrice);
        setHardCap(tokensToSell * startPrice);
      } else {
        // Clear softCap and hardCap when any of the input fields are empty
        setSoftCap(0);
        setHardCap(0);
      }
    };

    calculateCaps();
  }, [infoData.tokensToSell, infoData.startPrice, infoData.endPrice]);
  return (
    <>
      <div>
        <BgInput>
          <p className="mb-1">
            <label htmlFor="tokensToSell" className="custom-label">
              Total Selling Amount
            </label>
          </p>
          <div>
            <input
              id="tokensToSell"
              name="tokensToSell"
              onChange={handleOnChange}
              type="number"
              defaultValue={0}
              required
              className="custom-input"
            />
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Total tokens to sell must be greater than 0
          </p>
        </BgInput>
        <div className="grid grid-cols-2 gap-x-6">
          <BgInput>
            <div>
              <p className="mb-1">
                <label htmlFor="startPrice" className="custom-label">
                  Start Price (ETH)
                </label>
              </p>
              <div>
                <input
                  id="startPrice"
                  name="startPrice"
                  onChange={handleOnChange}
                  placeholder="Ex: 10"
                  type="number"
                  min={1}
                  className="custom-input"
                  required
                />
              </div>
            </div>
            {/* <p className="inputAlert">Start price must be greater than 0</p> */}
          </BgInput>
          <BgInput>
            <div>
              <p className="mb-1">
                <label htmlFor="endPrice" className="custom-label">
                  End Price (ETH)
                </label>
              </p>
              <div>
                <input
                  placeholder="Ex: 10"
                  id="endPrice"
                  name="endPrice"
                  onChange={handleOnChange}
                  type="number"
                  min={1}
                  className="custom-input"
                  required
                />
              </div>
              {/* <p className="inputAlert"> End price must be greater than 0</p> */}
            </div>
          </BgInput>
          <BgInput>
            <div>
              <p className="mb-1">
                <label htmlFor="softCap" className="custom-label">
                  SoftCap (ETH)
                </label>
              </p>
              <div>
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  value={softCap}
                  type="number"
                  min={1}
                  placeholder="Ex: 10"
                  className="custom-input"
                  required
                />
              </div>
            </div>
            {/* <p className="inputAlert">Soft cap must be greater than 0</p> */}
          </BgInput>
          <BgInput>
            <div>
              <p className="mb-1">
                <label htmlFor="hardCap" className="custom-label">
                  HardCap (ETH)
                </label>
              </p>
              <div>
                <input
                  id="hardCap"
                  value={hardCap}
                  placeholder="Ex: 10"
                  onChange={handleOnChange}
                  name="hardCap"
                  type="number"
                  min={1}
                  className="custom-input"
                  required
                />
              </div>
            </div>
            {/* <p className="inputAlert"> Hard cap must be greater than 0</p> */}
          </BgInput>
        </div>
        <BgInput>
          <p className="mb-1">
            <label htmlFor="whitelist" className="custom-label">
              Whitelist
            </label>
          </p>
          <div className="flex space-x-2 ">
            <div className="flex items-center">
              <CustomCheckbox
                checked={!whitelist}
                onChange={(checked) => {
                  checked && setWhitelist(false);
                }}
              />
              <label htmlFor="disableWhitelist" className="ml-2">
                Disable
              </label>
            </div>
            <div className="flex items-center">
              <CustomCheckbox
                checked={whitelist}
                onChange={(checked) => {
                  checked && setWhitelist(true);
                }}
              />
              <label htmlFor="enableWhitelist" className="ml-2">
                Enable
              </label>
            </div>
          </div>
        </BgInput>
        <div className="grid grid-cols-2 gap-x-6">
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="minContribution" className="custom-label">
                Min Contribution (ETH)
              </label>
            </p>
            <div>
              <input
                id="minContribution"
                name="minContribution"
                onChange={handleOnChange}
                type="number"
                className="custom-input"
                required
              />
            </div>
          </div>
          {/* <p className="inputAlert"> Min contribution must be greater than 0</p> */}
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="maxContribution" className="custom-label">
                Max Contribution (ETH)
              </label>
            </p>
            <div>
              <input
                id="maxContribution"
                name="maxContribution"
                onChange={handleOnChange}
                type="number"
                className="custom-input"
                required
              />
            </div>
          </div>
          {/* <p className="inputAlert"> Max contribution must be greater than 0</p> */}
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="decreasePriceCycle" className="custom-label">
                Decrease Price Cycle (MINUTES)
              </label>
            </p>
            <div>
              <input
                id="decreasePriceCycle"
                name="decreasePriceCycle"
                onChange={handleOnChange}
                type="number"
                className="custom-input"
                required
              />
            </div>
          </div>
          {/* <p className="inputAlert"> 
            Decrease price cycle must be greater than 0
          </p> */}
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="liquidityPercent" className="custom-label">
                Liquidity Percent(%)
              </label>
            </p>
            <div>
              <input
                id="liquidityPercent"
                name="liquidityPercent"
                onChange={handleOnChange}
                type="number"
                className="custom-input"
                required
              />
            </div>
          </div>
          {/* <p className="inputAlert">Liquidity percent must be greater than 0</p> */}
        </BgInput>
        </div>
        <BgInput>
          <p className="mb-1">
            <label htmlFor="routerSelect" className="custom-label">
              Router
              <span className="ml-1 text-red-500">*</span>
            </label>
          </p>
          <div>
            <select
              id="routerSelect"
              name="routerSelect"
              className="custom-input"
              style={{borderRadius:"0px"}}
            >
              <option value="">-----Select Router Exchange-----</option>
              <option value="Uniswap">Uniswap</option>
            </select>
          </div>
        </BgInput>
        <div className="grid grid-cols-2 gap-x-6">
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="refundType" className="custom-label">
                Refund type
              </label>
            </p>
            <div className="">
              <select
                id="refundType"
                name="refundType"
                onChange={handleOnChange}
                className="custom-input"
              >
                <option value="Burn">Burn</option>
                <option value="Refund">Refund</option>
              </select>
            </div>
          </div>
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="liquidityLockup" className="custom-label">
                Liquidity lockup (days)
              </label>
            </p>
            <div className="">
              <input
                id="liquidityLockup"
                name="liquidityLockup"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                className="custom-input"
                required
              />
            </div>
          </div>
          {/* <p className="inputAlert">Liquidity lockup must be greater than 0</p> */}
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="startDate" className="custom-label">
                Start time (UTC)
              </label>
            </p>
            <div className="">
              <input
                id="startDate"
                name="startDate"
                onChange={handleOnChange}
                type="datetime-local"
                className="custom-input"
                required
              />
            </div>
          </div>
        </BgInput>
        <BgInput>
          <div>
            <p className="mb-1">
              <label htmlFor="endDate" className="custom-label">
                End time (UTC)
              </label>
            </p>
            <div className="mb-4">
              <input
                id="endDate"
                name="endDate"
                type="datetime-local"
                defaultValue={0}
                onChange={handleOnChange}
                className="custom-input"
                required
              />
            </div>
          </div>
        </BgInput>
        </div>
        <BgInput>
          <div className="flex items-center">
            <p className="mb-1">
              <CustomCheckbox
                checked={vesting.enabled}
                onChange={(ch)=>{ch && handleVestingEnableChange("enable")}}
              />
            </p>
            <label htmlFor="vestingEnabled" className="ml-2 whitespace-nowrap">
              Enable Vesting
            </label>
          </div>
          <div className="flex items-center mb-8">
            <CustomCheckbox
                checked={!vesting.enabled}
                onChange={(ch)=>{ch && handleVestingEnableChange("disable")}}
            />
            <label htmlFor="vestingDisabled" className="ml-2 whitespace-nowrap">
              Disable Vesting
            </label>
          </div>

          {vesting.enabled && (
            <div>
              <p className="mb-1">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="tgereleasePercentage" className="inputHeading ">
                  TGE Release percentage(%)
                </label>
              </p>
              <div className="mb-8">
                <input
                  id="tgereleasePercentage"
                  name="tgereleasePercentage"
                  onChange={handleOnChange}
                  type="number"
                  className="custom-input"
                  placeholder="Ex: 10"
                />
                <p className="inputAlert">
                  TGE release percentage must be greater than 0
                </p>
              </div>

              <p className="mb-1">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="cycle" className="inputHeading "></label>
              </p>
              <div className="mb-8">
                <input
                  onChange={handleOnChange}
                  id="cycle"
                  name="cycle"
                  type="number"
                  className="custom-input"
                  placeholder="Ex: 10"
                />

                <p className="inputAlert">Cycle must be greater than 0</p>
              </div>

              <p className="mb-1">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label
                  htmlFor="cycleReleasePercentage"
                  className="inputHeading"
                >
                  Cycle Release percentage(%)
                </label>
              </p>
              <div className="mb-8">
                <input
                  onChange={handleOnChange}
                  id="cycleReleasePercentage"
                  name="cycleReleasePercentage"
                  type="number"
                  className="custom-input"
                  placeholder="Ex: 10"
                />
                <p className="inputAlert">
                  Cycle release percentage must be greater than 0
                </p>
              </div>
            </div>
          )}
        </BgInput>
      </div>
    </>
  );
};

export default DeFiLaunchpad;
