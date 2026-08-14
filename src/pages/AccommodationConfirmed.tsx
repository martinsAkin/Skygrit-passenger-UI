import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Download, Home, Info, MapPin } from "lucide-react";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/Atoms/StatusBadge";
import type { HotelBookingResult } from "../types/dashboardTypes";

export default function AccommodationConfirmedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  const result = (location.state as { result?: HotelBookingResult } | null)?.result;

  if (!result) {
    return (
      <PageContainer>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-semibold text-slate-900">No hotel booking to show</p>
          <p className="text-sm text-slate-500">
            This page only shows details right after you book a hotel. Head back to the dashboard to
            start again.
          </p>
          <Link to="/dashboard" className="focus-ring font-semibold text-brand-700 hover:text-brand-800">
            Return to Dashboard &rarr;
          </Link>
        </div>
      </PageContainer>
    );
  }

  async function handleDownload() {
    setDownloading(true);
    // TODO: wire up to real voucher PDF endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setDownloading(false);
  }

  const { hotel } = result;

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="flex flex-col items-center gap-5 pt-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Accommodation Confirmed</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
              Your hotel room has been successfully booked. A confirmation email with the voucher has
              been sent to your registered address.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left">
          <div className="flex items-center justify-between bg-slate-50 px-6 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Hotel Booking Reference
              </p>
              <p className="mt-0.5 text-xl font-bold text-slate-900">{result.bookingReference}</p>
            </div>
            <StatusBadge label="Confirmed" tone="green" solid />
          </div>

          <div className="flex flex-col gap-4 p-6 sm:flex-row">
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-auto sm:w-40"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">{hotel.name}</h2>
              {hotel.address && (
                <p className="mt-1.5 flex items-start gap-1.5 text-sm text-slate-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {hotel.address}
                    <br />({hotel.distanceFromAirport})
                  </span>
                </p>
              )}

              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Check-In</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{result.checkIn}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Check-Out</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{result.checkOut}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Guests</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{result.guests} Adult</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Room Type</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{result.roomType}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl rounded-tr-none rounded-tl-none bg-[#E0E7FF] p-4 text-sm text-[#0D47A1]">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">Important Instructions for your stay</p>
              <ul className="mt-2 space-y-2">
                {result.instructions.map((line) => (
                  <li key={line} className="opacity-90">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloading ? "Preparing..." : "Download Voucher (PDF)"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0D47A1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Return to Dashboard
          </button>
        </div>
      </div>
    </PageContainer>
  );
}