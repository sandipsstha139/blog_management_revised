"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import StepFour from "./Steps/StepFour";
import StepOne from "./Steps/StepOne";
import StepThree from "./Steps/StepThree";
import StepTwo from "./Steps/StepTwo";
import { useRouter } from "next/navigation";

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const getStatus = (index) => {
    if (index + 1 < currentStep) return "Completed";
    if (index + 1 === currentStep) return "In Progress";
    return "Pending";
  };
  const handleBackButton = () => {
    router.push("/dashboard/blog");
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const steps = [
    {
      id: 1,
      title: "Blog Form",
      content: (
        <StepOne
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      id: 2,
      title: "Blog Section Form",
      content: (
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      ),
    },
    { id: 3, title: "Blog Highlight Form", content: <StepThree /> },
    { id: 4, title: "Blog Highlight Section Form", content: <StepFour /> },
  ];
  return (
    <div className="max-w-full mx-auto p-4 flex flex-col justify-center relative">
      <Button
        variant="ghost"
        className="absolute top-2 sm:top-2 md:top-4 left-0"
        onClick={handleBackButton}
      >
        <ArrowLeft size={14} className="mr-1" /> Back
      </Button>
      <div className="flex flex-col sm:flex-row justify-center sm:mb-4 py-4 mt-4 sm:mt-0">
        <div className="flex justify-between max-w-2xl w-full relative ">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 text-center relative ">
              <div
                className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  getStatus(index) === "Completed"
                    ? "bg-green-500"
                    : getStatus(index) === "In Progress"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                {getStatus(index) === "Completed" ? (
                  <span className="text-white font-bold">&#10003;</span>
                ) : getStatus(index) === "In Progress" ? (
                  <span className="text-white font-bold">{index + 1}</span>
                ) : (
                  <span className="text-gray-500">{index + 1}</span>
                )}
              </div>

              <div className="mt-1 text-xs font-semibold text-gray-600 hidden sm:block">
                {step.title}
              </div>
              <div
                className={`text-xs mb-3 sm:mb-0 hidden sm:block ${
                  getStatus(index) === "Completed"
                    ? "text-green-500"
                    : getStatus(index) === "In Progress"
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                {getStatus(index)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border rounded w-full sm:w-9/12 mx-auto bg-white shadow-sm">
        {steps[currentStep - 1].content}
      </div>
    </div>
  );
};

export default StepperForm;
