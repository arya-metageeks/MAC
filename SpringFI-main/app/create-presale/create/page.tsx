"use client";
import React, { useState } from "react";
import StepperContainer from "@/components/StepperContainer";
import GradientBorderContainer from "@/components/GradientBorderContainer";
import BeforeYouStart from "./components/BeforeYouStart";
import PrivateSale from "./components/PrivateSale";
import AddAdditional from "./components/AddAdditional";
import Finish from "./components/Finish";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = [
    "Before you start",
    "Private Sale",
    "Additional Info",
    "Finish Page",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <GradientBorderContainer heading="Create Pre-Sale">
      <StepperContainer
        steps={steps}
        description={
          "ENTER THE LAUNCHPAD INFORMATION THAT YOU WANT TO RAISE, THAT SHOULD BE ENTER ALL DETAILS ABOUT YOUR PRIVATE SALE"
        }
      >
        <BeforeYouStart
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
        />
        <PrivateSale
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
        />
        <AddAdditional onStepValidation={handleStepValidation} />
        <Finish />
      </StepperContainer>
    </GradientBorderContainer>
  );
};

export default Page;
