import type { Flight } from "../types/dashboardTypes";
import { useEffect, useState } from "react";
import { CheckCircle2, FileDown } from "lucide-react";
import PageContainer from "../components/PageContainer";
import LoadingState from "../components/Atoms/LoadingState";
import { api } from "../lib/api";
import { currentUser, passengers } from "../mockData/DashboardData";
import { RebookDetails } from "../components/RebookFlightCards";
import { useNavigate } from "react-router-dom";



// main card

export default function RebookingConfirmed() {
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    api.getProposedFlight().then((res) => {
      setFlight(res);
      setLoading(false);
    });
  }, []);

  const passengerList = passengers;

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }
  

  if (loading || !flight) {
    return (
      <PageContainer>
        <LoadingState label="Finalizing your itinerary..." />
      </PageContainer>
    );
  }


  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="flex flex-col items-center gap-5 pt-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Rebooking Confirmed</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
            Your flight has been successfully rebooked. We've sent a confirmation email with your updated eTickets to your registered email address.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border text-[#0D47A1] font-semibold border-[#1d337a] bg-[#E0E7FF] rounded-lg p-8">
            <span>BOOKING REFERENCE (PNR)</span>
            <span className="text-4xl">{currentUser.pnr}</span>
        </div>

        <RebookDetails heading="Confirmed Itinerary" selectedFlight={flight} />

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

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-gray-400 px-6 py-2 text-sm text-white hover:bg-gray-500 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => setDownloading(true)}
          >
            <FileDown className="mr-2 inline h-4 w-4" aria-hidden="true" />
            {downloading ? "Downloading..." : "Download Itinerary"}
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#0D47A1] px-6 py-2 text-sm text-white hover:bg-[#0b3a85] disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => navigate("/dashboard")}
          >
           Back to Dashboard
          </button>
        </div>

      </div>
    </PageContainer>
  );
}