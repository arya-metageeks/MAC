import {
  ERC20Abi,
  multiSendAbi,
  multiSendAddress,
} from "@/constants/Sepolia/createConstants";
import React, { use, useContext, useEffect, useState } from "react";
import { useBalance, useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { notifyError, notifySuccess } from "@/app/utils/notify";
import { useFormContext } from "@/context/FormContext";
import GlowingButton from "@/components/GlowingButton";
import CardWrapper from "./CardWrapper";
import { getGasPrice } from "wagmi/actions";
import { config } from "@/providers/RainbowWalletProvider";

type Props = {
  onStepValidation: (isValid: boolean) => void;
};
const MultiSenderStep =  ({ onStepValidation }:Props) => {
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
  // const tokenAddress = "0x45e9f834539bc2a0936f184779ced638c9b26459";
  // const infoData = {
  //   Allocations:
  //     "0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01\n0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01\n0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01\n0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01\n0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01\n0x99161a9beedad8297b4cf013ecafb14b64760ec2,0.01",
  // };
  // const tokenDetails = {
  //   symbol: "ATL",
  //   decimals: 18,
  //   name: "Atlanta",
  // };

  const { chain } = useAccount();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [gasPrice, setGasPrice] = useState<number>(0);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000"
  );
  const allowanceValue = ethers.constants.MaxUint256.toString();
  const {address,chainId} = useAccount()
  const {data:balanceData} = useBalance({address})
  const { writeContract } = useWriteContract({
    mutation: {
      onError: (err) => {
        notifyError(err.message);
      },
      onSuccess:()=>{
        notifySuccess("Transaction successful")
      }
    },
  });
  const allowance = () => {
    writeContract({
      //@ts-ignore
      address: tokenAddress,
      abi: ERC20Abi,
      functionName: "approve",
      //change address here accordingly.
      args: [multiSendAddress, allowanceValue],
    });
  };
  useEffect(()=>{
    getGasPrice(config,{
      // @ts-ignore
      chainId
    }).then(d=>setGasPrice(Number(d)/10**9))
  },[])
  useEffect(()=>{
    onStepValidation(true)
  },[])
  useEffect(() => {
    function updateAltTokenAddress(x: string, altTokenAddress: string): string {
      if (currency == "USDC" && x == "Polygon") {
        setAltTokenAddress("0x2791bca1f2de4661ed88a30c99a7a9449aa84174");
      } else if (currency === "USDT" && x === "Polygon") {
        setAltTokenAddress("0xc2132d05d31c914a87c6611c10748aeb04b58e8f");
      }
      return altTokenAddress;
    }
    if (chain) {
      updateAltTokenAddress(chain.name, altTokenAddress);
    }
    function parseInputData(inputData: string) {
      const lines = inputData.trim().split("\n");
      const addresses: string[] = [];
      const amounts: number[] = [];

      lines.forEach((line) => {
        const [addressStr, amountStr] = line.split(",");

        const cleanedAddress = addressStr.trim();
        const amount = parseFloat(amountStr?.trim()) || 0;

        addresses.push(cleanedAddress);
        amounts.push(amount);
      });

      return { addresses, amounts };
    }
    const { addresses, amounts } = parseInputData(infoData.Allocations);
    setAddresses(addresses);
    setAmounts(amounts);
  }, [
    currency,
    chain,
    altTokenAddress,
    feeOption,
    refundType,
    infoData.Allocations,
  ]);

  const multisender = () => {
    writeContract({
      address: multiSendAddress,
      abi: multiSendAbi,
      functionName: "multisendToken",
      args: [tokenAddress, false, addresses, amounts],
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <CardWrapper title={`${addresses?.length}` || ""} description={"Total number of addresses"}/>
        <CardWrapper title={`${amounts.reduce((prev, curr) => prev + curr, 0).toFixed(3)} ${tokenDetails.symbol}`} description={"Total number of tokens to be sent"}/>
        <CardWrapper title={`1`} description={"Total number of transactions needed"}/>
        <CardWrapper title={`${balanceData?.formatted ? Number(balanceData?.formatted).toFixed(2) :1}` || ""} description={`Your ${balanceData?.symbol} balance`}/>
        <CardWrapper title={`${0.003} ETH` || ""} description={"Approximate cost of operation"}/>
        <CardWrapper title={`${gasPrice} Gwei` || ""} description={"Selected network speed (Gas Price)"}/>
      </div>
      <div className="flex justify-center gap-4 pt-8">
        <GlowingButton>
          {" "}
          <button
            className=""
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </button>
        </GlowingButton>

        <GlowingButton>
          {" "}
          <button
            className=""
            onClick={() => {
              multisender();
            }}
          >
            {" "}
            MULTISEND
          </button>
        </GlowingButton>
      </div>
    </>
  );
};

export default MultiSenderStep;
