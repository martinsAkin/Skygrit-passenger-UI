import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import StatusBanner from "../components/Atoms/StatusBanner";
import LoadingState from "../components/Atoms/LoadingState";
import { api } from "../lib/api";
import type { Flight } from "../types/dashboardTypes";
import { passengers } from "../mockData/DashboardData";
import { RebookDetails } from "../components/RebookFlightCards";

export default function ReviewSelectedFlightPage() {
  const navigate = useNavigate();
  const { flightId } = useParams<{ flightId: string }>();
  const [rebook, setRebook] = useState<Flight[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    api.getRebookOptions().then((rebookRes) => {
      setRebook(rebookRes);
      setLoading(false);
    });
  }, []);

  const selectedFlight = rebook?.find((f) => f.id === flightId);
  const passengerList = passengers;

  async function handleAccept() {
    if (!selectedFlight) return;
    setAccepting(true);
    await api.selectRebookFlight(selectedFlight.id);
    setAccepting(false);
    navigate(`/rebook/${selectedFlight.id}/confirmed`);
  }

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  if (loading || !rebook) {
    return (
      <PageContainer>
        <LoadingState label="Finding your alternative flight..." />
      </PageContainer>
    );
  }

  // A stale or mistyped flightId in the URL shouldn't render a card full of blanks
  // or let the person confirm a booking for nothing.
  if (!selectedFlight) {
    return (
      <PageContainer>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-semibold text-slate-900">We couldn't find that flight</p>
          <p className="text-sm text-slate-500">
            It may have expired or the link is out of date. Please choose a flight again.
          </p>
          <BackLink to="/rebook" label="Back to Flight Options" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto flex flex-col gap-6 justify-center">
        <BackLink to="/rebook" label="Back to Flight Options" />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Review Selected Flight</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Please review your selected flight details before confirming your rebooking.
          </p>
        </div>

        <StatusBanner
          tone="warning"
          title="Action Required to Secure Seats"
          message={`This flight is not yet confirmed. Please review the details below and click "Confirm Rebooking" to secure your seats. Seat availability is limited.`}
        />

        <RebookDetails heading="New Flight Itinerary" selectedFlight={selectedFlight} />

        {passengerList.length === 0 ? (
          <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            No passengers found on this booking.
          </div>
        ) : (
          <div className="mt-3 hidden overflow-hidden rounded-xl border border-slate-200 bg-white sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3">Passengers Rebooked</th>
                </tr>
              </thead>
              <tbody>
                {passengerList.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 last:border-0">
                    <td className="flex gap-3 px-6 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                        {initials(p.name)}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">
                          {p.name} ({p.type})
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Ticket: 016-{p.eTicket} &bull; eTicket will be reissued
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-lg bg-gray-400 px-6 py-2 text-sm text-white hover:bg-gray-500"
            onClick={() => navigate("/rebook")}
          >
            Cancel & Go Back
          </button>
          <button
            type="button"
            disabled={accepting}
            className="rounded-lg bg-[#0D47A1] px-6 py-2 text-sm text-white hover:bg-[#0b3a85] disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleAccept}
          >
            {accepting ? "Confirming..." : "Confirm Rebooking"}
          </button>
        </div>
      </div>
    </PageContainer>
  );
}