import type { LucideIcon } from "lucide-react";
import type { Tone } from "../../types/dashboardTypes";


interface StatusBadgeProps {
  label: string;
  tone: Tone;
  icon?: LucideIcon;
}

const toneStyles: Record<Tone, string> = {
  red: "bg-red-50 text-red-700 ring-red-600/10",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/10",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  blue: "bg-brand-50 text-brand-700 ring-brand-600/10",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/10",
};

export default function StatusBadge({ label, tone, icon: Icon }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneStyles[tone]}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </span>
  );
}

