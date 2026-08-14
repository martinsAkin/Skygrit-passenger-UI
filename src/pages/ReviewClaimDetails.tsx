import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building2, Send } from "lucide-react";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import LoadingState from "../components/Atoms/LoadingState";
import StatusBadge from "../components/Atoms/StatusBadge";
import StepHeader from "../components/Atoms/StepHeader";
import { api } from "../lib/api";
import type { Booking, ClaimSelection, Passenger, PayoutDetails } from "../types/dashboardTypes";

export default function ReviewClaimDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selection = (location.state as ClaimSelection | null) ?? null;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengerList, setPassengerList] = useState<Passenger[]>([]);
  const [payout, setPayout] = useState<PayoutDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([api.getBooking(), api.getPassengers(), api.getPayoutDetails()]).then(
      ([bookingRes, passengersRes, payoutRes]) => {
        setBooking(bookingRes);
        setPassengerList(passengersRes);
        setPayout(payoutRes);
        setLoading(false);
      }
    );
  }, []);

  // Someone landing here directly (refresh, bookmark) won't have the selection
  // from the form — send them back to start the claim rather than show a broken review.
  if (!selection) {
    return (
      <PageContainer>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-semibold text-slate-900">No claim details to review</p>
          <p className="text-sm text-slate-500">
            Please fill out the claim form first so we know what you're claiming for.
          </p>
          <BackLink to="/compensation" label="Back to File Claim" />
        </div>
      </PageContainer>
    );
  }

  if (loading || !booking || !payout) {
    return (
      <PageContainer>
        <LoadingState label="Loading claim details..." />
      </PageContainer>
    );
  }

  const flight = booking.originalFlight;
  const claimingPassengers = passengerList.filter((p) => selection.passengerIds.includes(p.id));

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  async function handleSubmit() {
    if (!confirmed) return;
    setSubmitting(true);
    const res = await api.submitCompensationClaim(selection!);
    setSubmitting(false);
    navigate("/compensation/submitted", { state: { result: res.result } });
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink to="/compensation" label="Back to File Claim" />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Review Claim Details</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Please carefully review the details of your claim before final submission.
          </p>
        </div>

        <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <StepHeader step={1} title="Disrupted Flight Information" complete />
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
            <StepHeader step={2} title="Passenger Claiming" complete />
            <div className="mt-4 space-y-3">
              {claimingPassengers.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    {initials(p.name)}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <p className="text-sm text-slate-500">
                      {p.type} &bull; eTicket: {p.eTicket}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <StepHeader
              step={3}
              title="Payout Details"
              complete
              action={
                <button
                  type="button"
                  onClick={() => navigate("/compensation")}
                  className="focus-ring rounded-lg cursor-pointer border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Edit
                </button>
              }
            />
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border border-slate-200 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Payout Method</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                  <Building2 className="h-4 w-4 text-brand-700" aria-hidden="true" />
                  {payout.method}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Account Holder Name</dt>
                <dd className="mt-1 font-semibold text-slate-800">{payout.accountHolderName}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Bank Name</dt>
                <dd className="mt-1 font-semibold text-slate-800">{payout.bankName}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">IBAN / Account Number</dt>
                <dd className="mt-1 font-semibold text-slate-800">{payout.maskedAccountNumber}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">SWIFT / BIC Code</dt>
                <dd className="mt-1 font-semibold text-slate-800">{payout.swiftCode}</dd>
              </div>
            </dl>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-700"
            />
            <span>
              I confirm that the information provided is accurate and true to the best of my knowledge. I
              understand that submitting false claims may result in denial of compensation and legal
              consequences. By submitting this claim, I agree to the{" "}
              <a href="#" className="font-semibold text-brand-700 hover:underline">
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-brand-700 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => navigate("/compensation")}
              className="focus-ring rounded-lg cursor-pointer border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel Claim
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!confirmed || submitting}
              className="focus-ring flex items-center gap-2 cursor-pointer rounded-lg bg-[#0D47A1] px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {submitting ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}