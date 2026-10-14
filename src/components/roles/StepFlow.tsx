"use client";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepFlowProps {
  steps: Step[];
  accentColor: string;
}

const StepFlow = ({ steps, accentColor }: StepFlowProps) => {
  return (
    <div className="relative">
      {/* Desktop: horizontal stepper */}
      <div className="hidden md:flex items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex-1 flex items-start">
            <div className="flex flex-col items-center flex-1">
              {/* Number circle + connector line */}
              <div className="flex items-center w-full mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[15px] font-extrabold flex-shrink-0 z-10"
                  style={{ background: accentColor, fontFamily: "Manrope, sans-serif" }}
                >
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 h-[2px] mx-2"
                    style={{ background: `${accentColor}40` }}
                  />
                )}
              </div>
              {/* Text */}
              <div className="pr-6">
                <h4
                  className="text-[16px] font-semibold text-[#1a2b3c] mb-1.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-[13.5px] text-gray-500 leading-[1.65]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="flex flex-col gap-6 md:hidden">
        {steps.map((step, i) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-extrabold flex-shrink-0"
                style={{ background: accentColor, fontFamily: "Manrope, sans-serif" }}
              >
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 w-[2px] my-2 min-h-[24px]"
                  style={{ background: `${accentColor}40` }}
                />
              )}
            </div>
            <div className="pt-1 pb-2">
              <h4
                className="text-[15px] font-semibold text-[#1a2b3c] mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {step.title}
              </h4>
              <p
                className="text-[13.5px] text-gray-500 leading-[1.65]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepFlow;
