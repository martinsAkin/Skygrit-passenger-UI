import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import LoadingState from "../components/Atoms/LoadingState";
import StatusBadge from "../components/Atoms/StatusBadge";
import StepHeader from "../components/Atoms/StepHeader";
import PassengerSelectRow from "../components/Atoms/PassengerSelectRow";
import CompensationOptionCard from "../components/CompensationOption";
import { api } from "../lib/api";
import type { Booking, CompensationOption, Passenger } from "../types/dashboardTypes";

const CLAIM_REASONS = [
  "Flight Cancellation (Airline Fault)",
  "Flight Delay (3+ Hours)",
  "Denied Boarding",
  "Missed Connection",
  "Other",
];

export default function ClaimCompensationPage() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengerList, setPassengerList] = useState<Passenger[]>([]);
  const [options, setOptions] = useState<CompensationOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPassengerIds, setSelectedPassengerIds] = useState<string[]>([]);
  const [reason, setReason] = useState(CLAIM_REASONS[0]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  useEffect(() => {
    Promise.all([api.getBooking(), api.getPassengers(), api.getCompensationOptions()]).then(
      ([bookingRes, passengersRes, optionsRes]) => {
        setBooking(bookingRes);
        setPassengerList(passengersRes);
        setOptions(optionsRes);
        setSelectedPassengerIds(passengersRes.map((p) => p.id));
        setSelectedOptionId(optionsRes[0]?.id ?? "");
        setLoading(false);
      }
    );
  }, []);

  function togglePassenger(id: string) {
    setSelectedPassengerIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleReview() {
    navigate("/compensation/review", {
      state: { passengerIds: selectedPassengerIds, reason, optionId: selectedOptionId },
    });
  }

  if (loading || !booking) {
    return (
      <PageContainer>
        <LoadingState label="Loading your claim details..." />
      </PageContainer>
    );
  }

  const flight = booking.originalFlight;
  const canReview = selectedPassengerIds.length > 0 && !!selectedOptionId;

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Claim Compensation</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Submit your details to claim statutory compensation for the disruption of flight{" "}
            {flight.flightNumber}.
          </p>
        </div>

        <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <StepHeader step={1} title="Disrupted Flight Information" />
            <dl className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Flight</dt>
                <dd className="mt-1 font-semibold text-slate-800">
                  {flight.flightNumber} ({flight.from.code} - {flight.to.code})
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Date</dt>
                <dd className="mt-1 font-semibold text-slate-800">{flight.date}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Status</dt>
                <dd className="mt-1">
                  <StatusBadge label="Cancelled" tone="red" />
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <StepHeader step={2} title="Select Passengers" />
            <p className="mt-1 pl-10 text-sm text-slate-500">
              Select the passengers on this booking you are claiming compensation for.
            </p>
            <div className="mt-4 space-y-3">
              {passengerList.map((p) => (
                <PassengerSelectRow
                  key={p.id}
                  passenger={p}
                  selected={selectedPassengerIds.includes(p.id)}
                  onToggle={togglePassenger}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <StepHeader step={3} title="Reason for Claim" />
            <p className="mt-1 pl-10 text-sm text-slate-500">
              Please specify the reason you are filing this claim.
            </p>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="focus-ring mt-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800"
            >
              {CLAIM_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <StepHeader step={4} title="Compensation Preference" />
            <p className="mt-1 pl-10 text-sm text-slate-500">Select your preferred non-cash compensation option.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {options.map((option) => (
                <CompensationOptionCard
                  key={option.id}
                  option={option}
                  selected={selectedOptionId === option.id}
                  onSelect={() => setSelectedOptionId(option.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="focus-ring rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReview}
              disabled={!canReview}
              className="focus-ring rounded-lg bg-[#0D47A1] px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Review Claim Details
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}