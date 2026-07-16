import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import StatusBanner from "../components/Atoms/StatusBanner";
import LoadingState from "../components/Atoms/LoadingState";
import { api } from "../lib/api";
import type { Flight } from "../types/dashboardTypes";
import ProposedFlightCard, { FlightChangeActionPanel, OriginalFlightPreview } from "../components/AlternativeFlightComponents";

export default function ReviewAlternativeFlightPage() {
  const navigate = useNavigate();
  const [proposedFlight, setProposedFlight] = useState<Flight | null>(null);
  const [originalFlight, setOriginalFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    Promise.all([api.getProposedFlight(), api.getBooking()]).then(
      ([proposed, bookingRes]) => {
        setProposedFlight(proposed);
        setOriginalFlight(bookingRes.originalFlight);
        setLoading(false);
      }
    );
  }, []);

  async function handleAccept() {
    if (!proposedFlight) return;
    setAccepting(true);
    await api.acceptProposedFlight(proposedFlight.id);
    setAccepting(false);
    navigate("/alternative-flight/confirmed");
  }

  if (loading || !proposedFlight || !originalFlight) {
    return (
      <PageContainer>
        <LoadingState label="Finding your alternative flight..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            We've found an alternative flight for you
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Because your original flight was cancelled, we have proactively secured a seat for you on
            the next available flight to {proposedFlight.to.city.split(",")[0]}. Please review the
            details below to confirm your new itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <StatusBanner
              tone="info"
              title="Your seat is temporarily held"
              message="We've reserved this seat at no additional cost. Accept this proposed flight to immediately issue your new ticket and receive your boarding pass."
            />

            <ProposedFlightCard flight={proposedFlight} />
            <OriginalFlightPreview flight={originalFlight} />
          </div>

          <FlightChangeActionPanel
            title="What would you like to do?"
            fees={[
              { label: "Change Fees", value: "Waived", waived: true },
              { label: "Fare Difference", value: "Waived", waived: true },
            ]}
            totalLabel="Total Additional Cost"
            totalValue="$0.00"
            primaryLabel="Accept Proposed Flight"
            onPrimaryAction={handleAccept}
            primaryLoading={accepting}
            secondaryLabel="Explore Other Flights"
            secondaryTo="/rebook"
            disclaimer="By accepting, you confirm this new itinerary. Your e-ticket will be updated instantly, and you'll receive a confirmation email with your new details."
          />
        </div>
      </div>
    </PageContainer>
  );
}