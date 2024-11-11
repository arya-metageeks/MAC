import { ERC20Abi } from "@/constants/Ethereum/createConstants";
// import FormContext from "@/contexts/create/FormContext";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import SelectArrow from "@i/Custom-Select-Arrow.svg";

import { useAccount, useContractRead, useReadContract } from "wagmi";
import Image from "next/image";
import { useFormContext } from "@/context/FormContext";
import CustomInput from "@/components/InputComponents/CustomInput";
import CustomTextarea from "@/components/InputComponents/CustomTextarea";
import { notifySuccess } from "@/app/utils/notify";
import FrostedBackgroundEffect from "@/components/FrostedBackgroundEffect";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { isValidAllocationString } from "@/app/utils";

type Props = {
  onStepValidation: (isValid: boolean) => void;
};
const PrepareStep = ({ onStepValidation }: Props) => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const {
    tokenAddress,
    setTokenAddress,
    setIsAffiliateEnabled,
    setCurrency,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
  } = useFormContext();

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
  };

  const checkTokenAddressValidity = () => {
    if (tokenAddress.trim() === "") {
      setIsValidAddress(false);
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      return;
    }

    const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]+$/.test(tokenAddress);
    // const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]{40}$/i.test(tokenAddress);
    notifySuccess(`${isTokenAddressFormatValid}`);
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
  const { infoData, setInfoData } = useFormContext();
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    // onStepValidation(isFormValid());
  };
  const isFormValid = (): boolean => {
    return infoData.Allocations !== "";
  };
  useEffect(() => {
    checkTokenAddressValidity();
  }, [tokenAddress]);
  useEffect(() => {
    const isFormValid = (): boolean => {
      return !!(tokenDetails.name && tokenAddress && isValidAllocationString(infoData.Allocations) )
    };
    onStepValidation(isFormValid());
    // setIsAffiliateEnabled(affiliateChangePercent);
  }, [
    isValidAddress,
    tokenAddress,
    infoData?.Allocations,
    onStepValidation,
    affiliateChangePercent,
    setIsAffiliateEnabled,
  ]);

  return (
    <div>
      <div className="text-sm">
        <CustomChainSwitch />
        <div className="my-4">
          <FrostedBackgroundEffect>
            <input
              className="bg-transparent py-3 px-3 w-full focus:outline-none focus:bg-transparent"
              id="tokenAddress"
              name="Token address"
              type="text"
              placeholder="Enter token"
              value={tokenAddress}
              onChange={handleChangeTokenAddress}
              required
            />
          </FrostedBackgroundEffect>
        {!isValidAddress && (
          <div className="mt-1">
          <p className="custom-label text-red-500">Token address cannot be blank</p>
        </div>
      )}
        {isValidAddress && (
          <div className="mt-1">
            <p className="custom-label">Name: {tokenDetails.name}</p>
            <p className="custom-label">Symbol: {tokenDetails.symbol}</p>
            <p className="custom-label">Decimals: {tokenDetails.decimals}</p>
          </div>
        )}
        </div>
      </div>
      <textarea
        id="Allocations"
        name="Allocations"
        rows={10}
        placeholder="Insert allocation: separate with line breaks. Format: address,amount"
        onChange={handleOnChange}
        required
        className="custom-input border border-[rgb(255,255,255,0.1)] rounded-lg bg-[#212121]"
      />
    </div>
  );
};

const CustomChainSwitch = () => {
  const { chain } = useAccount();
  const { openChainModal } = useChainModal();
  return (
    <div className="relative">
      <FrostedBackgroundEffect>
        <button
          onClick={openChainModal}
          name=""
          id=""
          className="w-full relative py-2 px-3 bg-transparent select-none appearance-none focus:outline-none flex justify-between items-center"
        >
          <span className="text-sm">{chain?.name}</span>
          <div className="">
            <Image src={SelectArrow} alt="arrow" className="w-6" />
          </div>
        </button>
      </FrostedBackgroundEffect>
    </div>
  );
};
export default PrepareStep;
