import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { MdSkipNext } from "react-icons/md";
import Link from "next/link";
import GlowingButton from "./GlowingButton";

type Props = {
  title?: string;
  description?: string;
  steps: string[];
  children: React.ReactNode[];
  showSkip?: boolean;
};

const StepperContainer = ({
  title,
  description,
  steps,
  children,
  showSkip = true,
}: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const handleNext = () => {
    if (
      (isStepValid || activeStep === steps.length - 1) &&
      activeStep < children.length - 1
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsStepValid(false);
    } else {
      console.log("error");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsStepValid(false);
  };

  const handleSkip = () => {
    setActiveStep(steps.length - 1);
    setIsStepValid(false);
  };

  const handleStepValidation = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <ol className="flex mb-5 gap-4 w-full items-center justify-between ">
        {steps.map((step: string, index: number) => (
          <>
            <div key={index} className="shrink-0">
              <p
                className={` ${
                  activeStep == index ? "text-white" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
            {index != steps.length - 1 && (
              <div className="flex-1 bg-white h-[1px]"></div>
            )}
          </>
        ))}
      </ol>

      <div className="w-full">
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex justify-center mt-6 gap-8">
        {/* <GlowingButton>
          <button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={`flex items-center space-x-2 px-4 rounded-md ${
              activeStep === 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <BiLeftArrowAlt className="w-4 h-4 text-lg" />
            <span className="hidden sm:inline text-lg ">Prev</span>
          </button>
        </GlowingButton> */}
        {activeStep === steps.length - 1 ? (
          // <Link
          //   href="/"
          //   className="flex items-center space-x-2 px-4 rounded-md bg-[#7afd87]  border transition duration-300 hover:bg-blue-400 transform hover:scale-105 hover:shadow-md hover:shadow-white"
          // >
          //   <span>Finish</span>
          //   <BsCheckCircle className="w-4 h-4 animate-pulse" />
          // </Link>
          <></>
        ) : (
          <GlowingButton>
            <button
              onClick={handleNext}
              className={`flex items-center space-x-2 px-4 rounded-md outline-none focus:outline-none ${
                (isStepValid || activeStep === steps.length - 1) &&
                activeStep < children.length - 1
                  ? ""
                  : "opacity-20 transition duration-300 cursor-not-allowed"
              }`}
              disabled={!isStepValid && activeStep !== steps.length - 1}
            >
              <span className="hidden sm:inline  text-lg">Proceed</span>
              <BiRightArrowAlt className="w-4 h-4  text-lg " />
            </button>
          </GlowingButton>
        )}

        {/* {showSkip && (
          <button
            onClick={handleSkip}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeStep === steps.length - 1
                ? "bg-[#7afd87] text-white cursor-not-allowed animate-pulse"
                : "bg-[#9e9cf3] text-white border transition duration-300 hover:bg-[#6b68e3] transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
            }`}
            disabled={activeStep === steps.length - 1}
          >
            <span className="hidden sm:inline text-white text-lg">Skip</span>
            <MdSkipNext className="w-4 h-4 text-lg text-white" />
          </button>
        )} */}
      </div>
    </div>
  );
};

export default StepperContainer;
