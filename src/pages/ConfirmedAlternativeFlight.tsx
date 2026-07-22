import { Plane } from "lucide-react";
import type { Flight } from "../types/dashboardTypes";
import StatusBadge from "../components/Atoms/StatusBadge";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download, Home, Mail, BedDouble } from "lucide-react";
import PageContainer from "../components/PageContainer";
import LoadingState from "../components/Atoms/LoadingState";
import { api } from "../lib/api";
import { currentUser } from "../mockData/DashboardData";

interface ConfirmationTicketCardProps {
  pnr: string;
  flight: Flight;
  passengerName: string;
}

export function ConfirmationTicketCard({ pnr, flight, passengerName }: ConfirmationTicketCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 px-6 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Booking Reference</p>
          <p className="mt-0.5 text-xl font-bold text-brand-700">{pnr}</p>
        </div>
        <StatusBadge label="Confirmed" tone="green" />
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="min-w-0">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{flight.from.code}</p>
            <p className="mt-1 text-sm text-slate-500">{flight.from.city}</p>
          </div>

          <div className="flex flex-1 items-center">
            <span className="h-px flex-1 border-t border-dotted border-slate-300" />
            <Plane className="mx-2 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span className="h-px flex-1 border-t border-dotted border-slate-300" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{flight.to.code}</p>
            <p className="mt-1 text-sm text-slate-500">{flight.to.city}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-base font-medium text-slate-700">
          <span>{flight.departTime}</span>
          <span>{flight.arriveTime}</span>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Passenger</dt>
          <dd className="mt-1 font-semibold text-slate-800">{passengerName}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.flightNumber}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Date</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.date}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Class</dt>
          <dd className="mt-1 font-semibold text-slate-800">{flight.cabinClass}</dd>
        </div>
      </dl>
    </div>
  );
}




// main card

export default function AlternativeFlightConfirmedPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    api.getProposedFlight().then((res) => {
      setFlight(res);
      setLoading(false);
    });
  }, []);

  async function handleDownload() {
    setDownloading(true);
    // TODO: wire up to real e-ticket PDF endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setDownloading(false);
  }

  if (loading || !flight) {
    return (
      <PageContainer>
        <LoadingState label="Finalizing your itinerary..." />
      </PageContainer>
    );
  }

  // Display-only formatting tweaks specific to this confirmation summary.
  const displayFlight: Flight = {
    ...flight,
    date: "Nov 16, 2023",
    cabinClass: "Economy (Y)",
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="flex flex-col items-center gap-5 pt-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Alternative Flight Confirmed</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
              Your new itinerary has been finalized. Your original ticket has been exchanged and we've
              sent the updated e-ticket to your email.
            </p>
          </div>
        </div>

        <div className="text-left">
          <ConfirmationTicketCard pnr={currentUser.pnr} flight={displayFlight} passengerName="M. Robertson" />
        </div>

        <div className="flex gap-3 rounded-xl border border-brand-100 bg-surface-alt p-4 text-left text-sm text-brand-800">
          <Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            A new receipt and itinerary confirming the $0.00 fare difference and waived fees has been
            sent to your registered email address.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloading ? "Preparing..." : "Download E-Ticket"}
          </button>
          <Link
            to="/dashboard"
            className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Return to Dashboard
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-700">Need accommodation due to the schedule change?</p>
          <Link
            to="/accommodation"
            className="focus-ring mt-3 inline-flex items-center gap-2 rounded-lg bg-surface-alt px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            <BedDouble className="h-4 w-4" aria-hidden="true" />
            Request Hotel Allowance
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}