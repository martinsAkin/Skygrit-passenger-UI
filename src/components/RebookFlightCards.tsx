import { Flame, Globe2, Plane } from "lucide-react";
import { ArrowRight, Building, CalendarRange, Hash } from "lucide-react";
import type { Flight } from "../types/dashboardTypes";

interface FlightResultCardProps {
  flight: Flight;
  recommended?: boolean;
  onSelect: (flightId: string) => void;
}

export default function FlightResultCard({ flight, recommended, onSelect }: FlightResultCardProps) {
  const isPartner = !flight.operatedBy?.toLowerCase().includes("skygrit");
  const isDirect = !flight.stops || flight.stops === 0;

  return (
    <div
      className={`relative rounded-xl border bg-white p-5 sm:p-6 ${
        recommended ? "border-blue-600 ring-1 ring-blue-600" : "border-slate-200"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-5 rounded-full bg-blue-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      {/* Route / time row */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{flight.departTime}</p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.from.code} &bull; {flight.from.city}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center">
          {flight.duration && <span className="text-xs text-slate-400 sm:text-sm">{flight.duration}</span>}
          <div className="mt-1 flex w-full items-center">
            <span className="h-px flex-1 border-t border-dotted border-slate-300" />
            <Plane className="mx-2 h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
            <span className="h-px flex-1 border-t border-dotted border-slate-300" />
          </div>
          <span
            className={`mt-1 text-xs font-semibold sm:text-sm ${
              isDirect ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {isDirect ? "Direct" : `${flight.stops} Stop${flight.stops! > 1 ? "s" : ""}${flight.stopCode ? ` (${flight.stopCode})` : ""}`}
          </span>
        </div>

        <div className="min-w-0 text-right">
          <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {flight.arriveTime}
            {flight.arrivesNextDay && <sup className="ml-0.5 text-sm font-bold text-red-500">+1</sup>}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.to.code} &bull; {flight.to.city}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              isPartner ? "bg-slate-100 text-slate-500" : "bg-blue-700 text-white"
            }`}
          >
            {isPartner ? <Globe2 className="h-4 w-4" aria-hidden="true" /> : <Plane className="h-4 w-4" aria-hidden="true" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{flight.flightNumber}</p>
            <p className="text-xs text-slate-400">Operated by {flight.operatedBy}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {flight.seatsLeft !== undefined && flight.seatsLeft <= 5 && (
            <span className="flex items-center gap-1 text-xs font-semibold text-red-500 sm:text-sm">
              <Flame className="h-4 w-4" aria-hidden="true" />
              {flight.seatsLeft} seats left
            </span>
          )}
          <button
            type="button"
            onClick={() => onSelect(flight.id)}
            className={`focus-ring rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
              recommended
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "border border-slate-200 text-slate-800 hover:bg-slate-50"
            }`}
          >
            Select Flight
          </button>
        </div>
      </div>
    </div>
  );
}




interface RebookDetailsProps {
  heading: string;
  selectedFlight: Flight | null | undefined;
}

export const RebookDetails = ({ heading, selectedFlight }: RebookDetailsProps) => {
  if (!selectedFlight) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        We couldn't find that flight. Please go back and select one from the list.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-white">
      <div className="flex items-center gap-2 bg-[#E0E7FF] px-5 py-3 text-sm font-semibold text-[#0D47A1] sm:px-6">
        <Plane className="h-4 w-4" aria-hidden="true" />
        {heading}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-3 text-lg font-bold text-slate-900">
            <span>
              {selectedFlight.from.city} ({selectedFlight.from.code})
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span>
              {selectedFlight.to.city} ({selectedFlight.to.code})
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarRange className="h-4 w-4" aria-hidden="true" />
            <span>{selectedFlight.date}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 sm:gap-6">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{selectedFlight.departTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {selectedFlight.from.code}
              {selectedFlight.from.terminal ? ` \u2022 ${selectedFlight.from.terminal}` : ""}
            </p>
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
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{selectedFlight.arriveTime}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {selectedFlight.to.code}
              {selectedFlight.to.terminal ? ` \u2022 ${selectedFlight.to.terminal}` : ""}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-4 items-center">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight Number</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
              <Hash size={16} color="#0D47A1" aria-hidden="true" />
              {selectedFlight.flightNumber}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Class</dt>
            <dd className="mt-1 font-semibold text-slate-800">{selectedFlight.cabinClass}</dd>
          </div>
          <div className="col-span-2 sm:col-span-2 flex flex-col items-center">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Operated By</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
              <Building size={16} color="#0D47A1" aria-hidden="true" />
              {selectedFlight.operatedBy ?? "aero airlines"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};