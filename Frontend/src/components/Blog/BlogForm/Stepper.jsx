import React from "react";
import "./style.css";
const Stepper = () => {
  const steps = ["Step 1", "Step 2", "Step 3"];
  return (
    <div className="flex justify-between mt-3">
      {steps.map((step, index) => (
        <div key={index} className="step-item">
          <div>{index + 1}</div>
          <p className="text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
// className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-gray-600"
