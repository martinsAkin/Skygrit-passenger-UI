import { Plane } from "lucide-react";
import type { Flight } from "../types/dashboardTypes";
import StatusBadge from "../components/Atoms/StatusBadge";
import { statusToTone } from "../types/dashboardTypes";

interface FlightSummaryCardProps {
  flight: Flight;
  variant?: "detailed" | "compact";
  bookingDate?: string;
}

export default function FlightSummaryCard({
  flight,
  variant = "detailed",
  bookingDate,
}: FlightSummaryCardProps) {
  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{flight.from.code}</span>
          <Plane className="h-4 w-4 text-slate-300" aria-hidden="true" />
          <span className="text-xl font-bold text-slate-900">{flight.to.code}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
          <span>{flight.departTime}</span>
          <span>{flight.arriveTime}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-sm font-medium text-red-600">
          <StatusBadge label={flight.status === "cancelled" ? "Cancelled Flight" : flight.status} tone={statusToTone(flight.status)} />
        </div>
        {bookingDate && (
          <span className="text-xs font-medium text-slate-400 sm:text-sm">Booking Date: {bookingDate}</span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{flight.from.code}</p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.from.city}, {flight.from.country}
          </p>
          <p className="mt-3 text-base font-medium text-slate-700">{flight.departTime}</p>
        </div>
        <div className="flex flex-1 items-center gap-2 mx-5">
          <div className="h-px flex-1 border-t-2 border-dotted border-slate-300"/>
          <Plane className="h-5 w-5 shrink-0 text-slate-300 sm:h-6 sm:w-6" aria-hidden="true" />
          <div className="h-px flex-1 border-t-2 border-dotted border-slate-300"/>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{flight.to.code}</p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.to.city}, {flight.to.country}
          </p>
          <p className="mt-3 text-base font-medium text-slate-700">{flight.arriveTime}</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight Number</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.flightNumber}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Date</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.date}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Passengers</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.passengers} Adult</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Class</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.cabinClass}</dd>
        </div>
      </dl>
    </div>
  );
}