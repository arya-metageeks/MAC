import React, { use, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFormContext } from "@/context/FormContext";

type Props = {
  onStepValidation: (isValid: boolean) => void;
};
const ApproveStep = ({ onStepValidation }:Props) => {
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
  const [amounts, setAmounts] = useState<number[]>([]);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000"
  );
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

  return (
    <>
      <div className="flex gap-[5%] mb-6">
        <div className="border-[rgb(255,255,255,0.1)] border rounded-lg overflow-hidden py-6 relative px-6 flex items-center justify-center flex-col flex-1">
          <div className="bg-[rgb(255,255,255,0.1)] blur-md absolute top-0 left-0 w-full h-full"></div>
          <h1 className="text-2xl font-medium mb-2">
            {amounts.reduce((prev, curr) => prev + curr, 0).toFixed(3)}{" "}
            {tokenDetails.symbol}
          </h1>
          <p className="text-[#999999] text-xs">
            Total number of tokens to send
          </p>
        </div>
        <div className="border-[rgb(255,255,255,0.1)] border rounded-lg overflow-hidden py-6 relative px-6 flex items-center justify-center flex-col flex-1">
          <div className="bg-[rgb(255,255,255,0.1)] blur-md absolute top-0 left-0 w-full h-full"></div>
          <h1 className="text-2xl font-medium mb-2">0.1 ETH</h1>
          <p className="text-[#999999] text-xs">Your ETH Balance</p>
        </div>
      </div>

      <p className="custom-label">List of recipients</p>
      <div className="bg-white my-5 h-[1px] opacity-40"></div>
      <div className="flex flex-col gap-2">
        {addresses.map((add, i) => {
          return (
            <div className="flex justify-between" key={i}>
              <p className="text-[#888888]">{add}</p>
              <p>
                {`${amounts[i]} ${tokenDetails.symbol}`}
              </p>
            </div>
          );
        })}
      </div>
      <div className="bg-white my-5 h-[1px] opacity-40"></div>
    </>
  );
};

export default ApproveStep;
