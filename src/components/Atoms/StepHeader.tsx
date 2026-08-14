import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface StepHeaderProps {
  step: number;
  title: string;
  complete?: boolean;
  action?: ReactNode;
}

export default function StepHeader({ step, title, complete, action }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
          {complete ? <Check className="h-4 w-4" aria-hidden="true" /> : step}
        </span>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      {action}
    </div>
  );
}