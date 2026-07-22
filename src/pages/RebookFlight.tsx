import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Booking, Flight } from "../types/dashboardTypes";
import { api } from "../lib/api";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import FlightResultCard from "../components/RebookFlightCards";
import LoadingState from "../components/Atoms/LoadingState"

export const RebookOptions = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [rebook, setRebook] = useState<Flight[] | null>(null);
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getBooking(), api.getRebookOptions()]).then(
      ([bookingRes, rebookRes]) => {
        setBooking(bookingRes);
        setRebook(rebookRes);
        // Seed the pager from the original flight's ISO date, once, on load.
        if (bookingRes.originalFlight.isoDate) {
          setSearchDate(new Date(bookingRes.originalFlight.isoDate));
        }
        setLoading(false);
      }
    );
  }, []);

  function shiftDate(days: number) {
    setSearchDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + days);
      return next;
    });
    // TODO: once the API supports it, refetch rebook options for the new date:
    // api.getRebookOptions(next.toISOString()).then(setRebook);
  }

  async function handleSelect(flightId: string) {
    setSelectingId(flightId);
    await api.selectRebookFlight(flightId);
    setSelectingId(null);
    navigate(`/rebook/${flightId}`);
  }

  if (loading || !booking || !rebook) {
    return (
      <PageContainer>
        <LoadingState label="Searching for flights..." />
      </PageContainer>
    );
  }

  const { from, to } = booking.originalFlight;
  const formattedDate = searchDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Select a New Flight</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Choose an alternative flight for your journey from {from.city} ({from.code}) to {to.city} (
            {to.code}).
          </p>
        </div>

        {/* Route + date pager */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3 text-lg font-bold text-slate-900">
            <span>
              {from.city} ({from.code})
            </span>
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span>
              {to.city} ({to.code})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shiftDate(-1)}
              aria-label="Previous day"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800">
              <Calendar className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {formattedDate}
            </span>
            <button
              type="button"
              onClick={() => shiftDate(1)}
              aria-label="Next day"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {rebook.map((flight, index) => (
            <FlightResultCard
              key={flight.id}
              flight={flight}
              recommended={index === 0}
              onSelect={handleSelect}
            />
          ))}
        </div>
        {selectingId && (
          <p className="text-center text-sm text-slate-400">Holding your seat on {selectingId}...</p>
        )}
      </div>
    </PageContainer>
  );
};

export default RebookOptions;