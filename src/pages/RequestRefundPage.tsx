import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import StatusBanner from "../components/Atoms/StatusBanner";
import StatusBadge from "../components/Atoms/StatusBadge";
import LoadingState from "../components/Atoms/LoadingState";
import RadioSelectCard from "../components/RadioSelectCard";
import { api } from "../lib/api";
import { currentUser } from "../mockData/DashboardData";
import type { Booking, RefundMethodId, RefundMethodOption } from "../types/dashboardTypes";

const REFUND_REASONS = [
  "Flight Cancelled by Airline",
  "Flight Delayed",
  "Schedule Change",
  "Personal / Medical Reasons",
  "Other",
];

export default function RequestRefundPage() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [methods, setMethods] = useState<RefundMethodOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [reason, setReason] = useState(REFUND_REASONS[0]);
  const [selectedMethod, setSelectedMethod] = useState<RefundMethodId>("original");
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);

  useEffect(() => {
    Promise.all([api.getBooking(), api.getRefundMethodOptions()]).then(
      ([bookingRes, methodsRes]) => {
        setBooking(bookingRes);
        setMethods(methodsRes);
        setLoading(false);
      }
    );
  }, []);

  async function handleSubmit() {
    setSubmitting(true);
    const res = await api.submitRefundRequest({ method: selectedMethod, email, phone, reason });
    setSubmitting(false);
    navigate("/refund/submitted", { state: { result: res.result } });
  }

  if (loading || !booking) {
    return (
      <PageContainer>
        <LoadingState label="Loading your refund details..." />
      </PageContainer>
    );
  }

  const flight = booking.originalFlight;
  const selectedTotal = methods.find((m) => m.id === selectedMethod)?.amount ?? 0;

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Request Refund</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Review your details and select your preferred refund method for flight {flight.flightNumber}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <StatusBanner
              tone="info"
              // icon={Info}
              title="Refund Policy Information"
              message="You can cancel your refund request within 48 hours of submission. Once processed, you will receive a unique Tracking ID to monitor the status of your refund."
            />

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-slate-900">Disrupted Flight Information</h2>
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

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-slate-900">Reason for Refund</h2>
              <p className="mt-1 text-sm text-slate-500">Please select the reason you are requesting a refund.</p>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="focus-ring mt-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800"
              >
                {REFUND_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-slate-900">Refund Options</h2>
              <div className="mt-4 space-y-4">
                {methods.map((method) => (
                  <RadioSelectCard
                    key={method.id}
                    selected={selectedMethod === method.id}
                    onSelect={() => setSelectedMethod(method.id)}
                    title={method.title}
                    description={method.description}
                    valueLabel={`$${method.amount.toFixed(2)}`}
                    badge={method.bonusLabel}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-slate-900">Tracking &amp; Updates</h2>
              <p className="mt-1 text-sm text-slate-500">
                We will send a unique Tracking ID to this email address so you can securely monitor your
                refund status.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700" htmlFor="refund-email">
                    Email Address
                  </label>
                  <input
                    id="refund-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700" htmlFor="refund-phone">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="refund-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="focus-ring rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="focus-ring rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Refund Request"}
              </button>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-base font-bold text-slate-900">Flight Summary</h2>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-slate-900">{flight.from.code}</span>
              <span className="text-slate-300">&#9992;</span>
              <span className="text-xl font-bold text-slate-900">{flight.to.code}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
              <span>{flight.departTime}</span>
              <span>{flight.arriveTime}</span>
            </div>

            <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Passenger</dt>
                <dd className="font-semibold text-slate-800">{currentUser.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Flight</dt>
                <dd className="font-semibold text-slate-800">{flight.flightNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Date</dt>
                <dd className="font-semibold text-slate-800">{flight.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Booking Class</dt>
                <dd className="font-semibold text-slate-800">{flight.cabinClass}</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-sm font-bold text-slate-900">Total Refund</p>
              <p className="text-lg font-bold text-brand-700">${selectedTotal.toFixed(2)}</p>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}