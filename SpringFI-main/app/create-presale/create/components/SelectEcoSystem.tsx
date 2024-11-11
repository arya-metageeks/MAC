import CustomCheckbox from "@/components/CustomCheckbox";
import React from "react";
import selectedImage from "@i/Ecosystem-picker-bg.png";
import Image from "next/image";
const SelectEcoSystem = ({
  selectedEcosystem,
  setSelectedEcosystem,
}: {
  selectedEcosystem: string;
  setSelectedEcosystem: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-6">
      <div
        className="p-[1px] rounded-lg  flex-1"
        style={{
          background:
            selectedEcosystem === "evm"
              ? `linear-gradient(95.06deg, rgba(106, 106, 106, 0) 0.29%, #00B3FF 99.71%)`
              : `linear-gradient(95.06deg, #FFFFFF 0.29%, #00B3FF 99.71%)`,
        }}
      >
        <div className="relative rounded-lg overflow-hidden font-medium bg-black">
          <Image
            src={selectedImage}
            className={`object-cover w-full h-full ${
              selectedEcosystem == "evm" ? "opacity-60" : "opacity-10"
            }`}
            fill={true}
            alt=""
          />
          <div className="flex items-center gap-2 py-8 px-6 relative">
            <CustomCheckbox
              checked={selectedEcosystem == "evm"}
              onChange={(isChecked) => {
                isChecked && setSelectedEcosystem("evm");
              }}
            />
            <span className="text-semibold">EVM Token</span>
          </div>
        </div>
      </div>
      <div
        className="p-[1px] rounded-lg  flex-1"
        style={{
          background:
            selectedEcosystem === "solana"
              ? `linear-gradient(95.06deg, rgba(106, 106, 106, 0) 0.29%, #00B3FF 99.71%)`
              : `linear-gradient(95.06deg, #FFFFFF 0.29%, #00B3FF 99.71%)`,
        }}
      >
        <div className="relative rounded-lg overflow-hidden font-medium bg-black">
          <Image
            src={selectedImage}
            className={`object-cover w-full h-full ${
              selectedEcosystem == "solana" ? "opacity-60" : "opacity-10"
            }`}
            fill={true}
            alt=""
          />
          <div className="flex items-center gap-2 py-8 px-6 relative">
            <CustomCheckbox
              checked={selectedEcosystem == "solana"}
              onChange={(isChecked) => {
                isChecked && setSelectedEcosystem("solana");
              }}
            />
            <span className="text-semibold">Solana Ecosystem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectEcoSystem;
