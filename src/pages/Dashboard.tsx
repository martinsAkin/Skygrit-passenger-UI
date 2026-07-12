import { useEffect, useState } from "react";
import { BedDouble, Calendar, RefreshCw, Scale, Ticket } from "lucide-react";
import PageContainer from "../components/PageContainer";
import StatusBanner from "../components/Atoms/StatusBanner";
import FlightSummaryCard from "../components/FlightSummaryCard";
import OptionCard from "../components/DashboardOptionCard";
import ActiveRequestsTable from "../components/DashboardActiveRequests";
import LoadingState from "../components/Atoms/LoadingState";
import { api } from "../lib/api";
import type { ActiveRequest, Booking } from "../types/dashboardTypes";
import { currentUser } from "../mockData/DashboardData";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [requests, setRequests] = useState<ActiveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getBooking(), api.getActiveRequests()]).then(
      ([bookingRes, requestsRes]) => {
        setBooking(bookingRes);
        setRequests(requestsRes);
        setLoading(false);
      }
    );
  }, []);

  async function handleCancelRequest(id: string) {
    await api.cancelRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading || !booking) {
    return (
      <PageContainer>
        <LoadingState label="Loading your booking..." />
      </PageContainer>
    );
  }

  const flight = booking.originalFlight;
  const isCancelled = flight.status === "cancelled";

  return (
    <PageContainer>
      <Navbar
          userName={currentUser.name}
          pnr={currentUser.pnr}
          onSignOut={() => navigate("/login")}
        />
      <div className="space-y-6">
        {isCancelled && booking.cancellationReason && (
          <StatusBanner title="Booking Status: Flight Cancelled" message={booking.cancellationReason} />
        )}

        <FlightSummaryCard flight={flight} bookingDate="Oct 12, 2023" />

        <section>
          <h2 className="text-lg font-bold text-slate-900">Available Options</h2>
          <p className="mt-1 text-sm text-slate-500">
            Please select one of the following options to manage your disrupted flight.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <OptionCard
              icon={RefreshCw}
              title="Accept Alternative Flight"
              description="Check out an alternative flight departing tomorrow at 10:00 AM."
              ctaLabel="View & Accept"
              to="/alternative-flight"
              recommended
            />
            <OptionCard
              icon={Calendar}
              title="Rebook Flight"
              description="Select a completely new flight from our schedule that better suits your travel plans."
              ctaLabel="Browse Flights"
              to="/rebook"
            />
            <OptionCard
              icon={Ticket}
              title="Request Refund"
              description="Request a full or partial refund"
              ctaLabel="Initiate Refund"
              to="/refund"
              secondaryLabel="Track Status"
              secondaryTo="/refund/status"
            />
            <OptionCard
              icon={BedDouble}
              title="Request Accommodation"
              description="Need a place to stay due to an overnight delay? Request a complimentary hotel voucher."
              ctaLabel="Request Hotel"
              to="/accommodation"
            />
            <OptionCard
              icon={Scale}
              title="Claim Compensation"
              description="Check eligibility."
              ctaLabel="Claim Compensation"
              to="/compensation"
              secondaryLabel="Track Status"
              secondaryTo="/compensation/status"
            />
          </div>
        </section>

        <ActiveRequestsTable requests={requests} onCancelRequest={handleCancelRequest} />
      </div>
    </PageContainer>
  );
}