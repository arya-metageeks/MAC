"use client";
import React, { useState } from "react";
import StepperContainer from "@/components/StepperContainer";
import GradientBorderContainer from "@/components/GradientBorderContainer";
import VerifyToken from "../section/VerifyToken";
import DeFiLaunchpad from "../section/DeFiLaunchpad";
import AddAdditional from "../section/AddAdditional";
import Finish from "../section/Finish";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = [
    "Verify Token",
    "DeFi Launchpad Info",
    "Additional Info",
    "Finish Page",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <GradientBorderContainer heading="Create Subscription">
      <StepperContainer
        steps={steps}
        description={
          "ENTER THE LAUNCHPAD INFORMATION THAT YOU WANT TO RAISE, THAT SHOULD BE ENTER ALL DETAILS ABOUT YOUR SUBSCRIPTION"
        }
      >
        <VerifyToken onStepValidation={handleStepValidation} />
        <DeFiLaunchpad
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
