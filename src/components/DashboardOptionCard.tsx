import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  recommended?: boolean;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function OptionCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
  to,
  recommended,
  secondaryLabel,
  secondaryTo,
}: OptionCardProps) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border border-blue-600 bg-white p-5 sm:p-6 ${
        recommended ? "border-brand-600 ring-1 ring-brand-600" : "border-slate-200"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-5 rounded-full bg-blue-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{description}</p>

      <Link
        to={to}
        className="focus-ring mt-5 inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
      >
        {ctaLabel}
      </Link>

      {secondaryLabel && secondaryTo && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Already applied?</span>
          <Link to={secondaryTo} className="focus-ring font-semibold text-brand-700 hover:text-brand-800">
            {secondaryLabel} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}