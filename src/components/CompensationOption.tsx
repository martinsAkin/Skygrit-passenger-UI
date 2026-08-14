import { Plane, Ticket } from "lucide-react";
import type { CompensationOption } from "../types/dashboardTypes";

interface CompensationOptionCardProps {
  option: CompensationOption;
  selected: boolean;
  onSelect: () => void;
}

export default function CompensationOptionCard({ option, selected, onSelect }: CompensationOptionCardProps) {
  const Icon = option.icon === "voucher" ? Ticket : Plane;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`focus-ring flex h-full w-full flex-col rounded-xl border p-4 text-left transition-colors sm:p-5 ${
        selected ? "border-brand-600 bg-brand-50/40 ring-1 ring-brand-600" : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            selected ? "bg-brand-700 text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-brand-700" : "border-slate-300"
          }`}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />}
        </span>
      </div>

      <p className="mt-4 font-semibold text-slate-900">{option.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{option.description}</p>
    </button>
  );
}