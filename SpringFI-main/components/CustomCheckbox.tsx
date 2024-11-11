import { CheckedIcon } from "@/assets/icons";
import React from "react";

const CustomCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (newState: boolean) => void;
}) => {
  return (
    <button className={`w-5 h-5 rounded-sm flex items-center justify-center  ${checked && "bg-[#5C34FF]"}`} onClick={()=>{onChange(!checked)}}>
      <div className="w-[14px] h-[14px]  border-[1px] rounded-sm border-gray-300"></div>
    </button>
  );
};

export default CustomCheckbox;
