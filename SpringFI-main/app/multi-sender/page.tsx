"use client";
import React, { useState } from "react";

import PrepareStep from "./section/PrepareStep";
import Finish from "./section/Finish";
import StepperContainer from "@/components/StepperContainer";
import ApproveStep from "./section/ApproveStep";
import GradientBorderContainer from "@/components/GradientBorderContainer";

import Logo from "@i/Logo.svg";
import GridBG from "@i/grid-bg.svg";
import Heading1 from "@i/temp/MultiSender.svg";
import Heading2 from "@i/temp/by SpringFI.svg";
import Image from "next/image";
import MultiSenderStep from "./section/MultiSenderStep";
// import HorizontalLinearStepper3 from "@/components/stepper3";
import FormBG from "@i/MS-Form-BG.png"
const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = ["Prepare",  "Approve", "Multisend"
];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <div className="relative overflow-hidden">
      <Image
        src={GridBG}
        alt=""
        className="w-[50%] absolute left-1/2 -translate-x-1/2"
      />
      <div className="flex flex-col items-center mb-10">
        <Image src={Logo} alt="" className="w-40 mb-8" />
        <Image src={Heading1} alt="" className="w-full max-w-[450px]" />
        <Image
          src={Heading2}
          alt=""
          className="w-full max-w-[265px] -translate-y-[14px]"
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <GradientBorderContainer>
          
 <Image src={FormBG} alt="" priority={true} fill={true} className='opacity-30 w-full object-cover h-full' style={{boxShadow:"0px 4px 99.1px 6px #552BFF40;"}} />
          <div className="px-[5%] relative">
          <StepperContainer steps={steps}>
            <PrepareStep onStepValidation={handleStepValidation} />
            <ApproveStep onStepValidation={handleStepValidation} />
            <MultiSenderStep onStepValidation={handleStepValidation} />
             {/* <Finish /> */}
          </StepperContainer>
          </div>
        </GradientBorderContainer>
      </div>
    </div>
  );
};

export default Page;
