import { Clock, Sparkles, Plane,  CheckCircle2, Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import type { Flight } from "../types/dashboardTypes";
import StatusBadge from "./Atoms/StatusBadge";

interface OriginalFlightPreviewProps {
  flight: Flight;
}

export function OriginalFlightPreview({ flight }: OriginalFlightPreviewProps) {
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <span className="h-px w-full bg-slate-200" />
        <span className="absolute inline-flex items-center rounded-full border border-slate-200 bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Replaces Your Previous Booking
        </span>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5 opacity-70 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-slate-500">{flight.date}</p>
          <StatusBadge label="Cancelled" tone="red" />
        </div>

        <div className="mt-5 flex items-center gap-3 sm:gap-6">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-slate-400 sm:text-3xl">{flight.departTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{flight.from.code}</p>
            <p className="text-xs text-slate-400">{flight.from.city}</p>
          </div>

          <div className="flex flex-1 items-center">
            <span className="h-px flex-1 border-t border-slate-200" />
            <Plane className="mx-2 h-5 w-5 shrink-0 text-slate-300" aria-hidden="true" />
            <span className="h-px flex-1 border-t border-slate-200" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-2xl font-bold text-slate-400 sm:text-3xl">{flight.arriveTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{flight.to.code}</p>
            <p className="text-xs text-slate-400">{flight.to.city}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-white p-4 text-sm sm:w-1/2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight Number</dt>
            <dd className="mt-1 font-semibold text-slate-500">{flight.flightNumber}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Passengers</dt>
            <dd className="mt-1 font-semibold text-slate-500">{flight.passengers} Adult</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}


// Proposed flight card

interface ProposedFlightCardProps {
  flight: Flight;
}

export default function ProposedFlightCard({ flight }: ProposedFlightCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-brand-700 bg-white">
      <div className="flex items-center gap-2 bg-brand-800 px-5 py-3 text-sm font-semibold text-white sm:px-6">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Proposed New Flight
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-slate-700 sm:text-base">{flight.date}</p>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/10">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Seat Held
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 sm:gap-6">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{flight.departTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{flight.from.code}</p>
            <p className="text-xs text-slate-500 sm:text-sm">{flight.from.city}</p>
          </div>

          <div className="flex flex-1 items-center">
            <span className="h-px flex-1 border-t-2 border-dotted border-brand-300" />
            <svg
              viewBox="0 0 24 24"
              className="mx-2 h-5 w-5 shrink-0 rotate-90 text-brand-700 sm:h-6 sm:w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span className="h-px flex-1 border-t-2 border-dotted border-brand-300" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{flight.arriveTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{flight.to.code}</p>
            <p className="text-xs text-slate-500 sm:text-sm">{flight.to.city}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight Number</dt>
            <dd className="mt-1 font-semibold text-slate-800">{flight.flightNumber}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Passengers</dt>
            <dd className="mt-1 font-semibold text-slate-800">{flight.passengers} Adult</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Cabin Class</dt>
            <dd className="mt-1 font-semibold text-slate-800">{flight.cabinClass}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Aircraft</dt>
            <dd className="mt-1 font-semibold text-slate-800">{flight.aircraft ?? "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}




// side cards

interface FeeRow {
  label: string;
  value: string;
  waived?: boolean;
}

interface FlightChangeActionPanelProps {
  title: string;
  fees: FeeRow[];
  totalLabel: string;
  totalValue: string;
  primaryLabel: string;
  onPrimaryAction: () => void;
  primaryLoading?: boolean;
  secondaryLabel?: string;
  secondaryTo?: string;
  disclaimer?: string;
}

export function FlightChangeActionPanel({
  title,
  fees,
  totalLabel,
  totalValue,
  primaryLabel,
  onPrimaryAction,
  primaryLoading,
  secondaryLabel,
  secondaryTo,
  disclaimer,
}: FlightChangeActionPanelProps) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24 h-[59%]">
      <h2 className="text-center text-lg font-bold text-slate-900">{title}</h2>

      <dl className="mt-5 space-y-3">
        {fees.map((fee) => (
          <div key={fee.label} className="flex items-center justify-between text-sm">
            <dt className="text-slate-500">{fee.label}</dt>
            <dd>
              {fee.waived ? (
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                  {fee.value}
                </span>
              ) : (
                <span className="font-semibold text-slate-800">{fee.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-slate-900">{totalLabel}</p>
        <p className="text-lg font-bold text-slate-900">{totalValue}</p>
      </div>

      <button
        type="button"
        onClick={onPrimaryAction}
        disabled={primaryLoading}
        className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold cursor-pointer bg-blue-600 text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {primaryLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        )}
        {primaryLabel}
      </button>

      {secondaryLabel && secondaryTo && (
        <Link
          to={secondaryTo}
          className="focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          {secondaryLabel}
        </Link>
      )}

      {disclaimer && <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">{disclaimer}</p>}
    </aside>
  );
}