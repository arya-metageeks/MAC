import React from "react";
import DetailContainer from "@/components/DetailContainer";

interface Props {
  lockedAmount: number;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
}

const TopBox: React.FC<Props> = ({
  lockedAmount,
  tokenAddress,
  tokenName,
  tokenSymbol,
  tokenDecimals,
}) => {
  return (
    <DetailContainer>
      <div className="">
        <h1 className="text-2xl font-bold gradient-heading  mb-8 dark:text-gray-200 text-neutral-800 ">
          Lock info
        </h1>
      </div>
      <div className="flex gap-12 border-b border-white-10 justify-between break-all mb-8">
        <p>Current Locked Amount</p>
        <p>
          {lockedAmount} {tokenSymbol}
        </p>
      </div>
      <div className="flex gap0-12 border-b border-white-10 justify-between break-all mb-8">
        <p>Token Address</p>
        <p>{tokenAddress}</p>
      </div>
      <div className="flex gap0-12 border-b border-white-10  justify-between break-all mb-8">
        <p>Token Name</p>
        <p>{tokenName}</p>
      </div>
      <div className="flex gap0-12 border-b border-white-10 justify-between break-all mb-8">
        <p>Token Symbol</p>
        <p> {tokenSymbol}</p>
      </div>
      <div className="flex gap0-12 border-b border-white-10  justify-between break-all ">
        <p>Token Decimals</p>
        <p>{tokenDecimals}</p>
      </div>
    </DetailContainer>
  );
};

export default TopBox;
