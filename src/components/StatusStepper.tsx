import { Check, Search } from "lucide-react";
import type { RefundStatusStep } from "../types/dashboardTypes";

export default function StatusStepper({ steps }: { steps: RefundStatusStep[] }) {
  return (
    <div className="flex items-start">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.label} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center text-center">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold sm:h-12 sm:w-12 ${
                  step.status === "done"
                    ? "border-brand-700 bg-brand-700 text-white"
                    : step.status === "current"
                    ? "border-brand-700 bg-white text-brand-700"
                    : "border-slate-200 bg-white text-slate-300"
                }`}
              >
                {step.status === "done" ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : step.status === "current" ? (
                  <Search className="h-4 w-4" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <p
                className={`mt-2 max-w-[6rem] text-xs font-semibold sm:text-sm ${
                  step.status === "pending" ? "text-slate-400" : "text-slate-900"
                }`}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">{step.timestamp ?? "Pending"}</p>
            </div>

            {!isLast && (
              <span
                className={`mx-2 h-0.5 flex-1 sm:mx-3 ${
                  step.status === "done" ? "bg-brand-700" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}