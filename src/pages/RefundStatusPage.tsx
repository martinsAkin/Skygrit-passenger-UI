import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import LoadingState from "../components/Atoms/LoadingState";
import StatusBadge, { statusToTone } from "../components/Atoms/StatusBadge";
import StatusStepper from "../components/StatusStepper";
import { api } from "../lib/api";
import type { RefundStatusDetail } from "../types/dashboardTypes";

export default function RefundStatusPage() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<RefundStatusDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    api.getRefundStatus().then((res) => {
      setDetail(res);
      setLoading(false);
    });
  }, []);

  async function handleCancel() {
    if (!detail) return;
    setCancelling(true);
    await api.cancelRefundRequest(detail.requestId);
    setCancelling(false);
    navigate("/dashboard");
  }

  if (loading || !detail) {
    return (
      <PageContainer>
        <LoadingState label="Loading refund status..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Refund Request Status</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Track the progress of your refund request for flight {detail.originalFlightLabel.split(" ")[0]}.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Request ID</p>
                <p className="mt-1 text-base font-bold text-slate-900">{detail.requestId}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Request Type</p>
                <p className="mt-1 text-base font-bold text-slate-900">{detail.requestType}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date Submitted</p>
                <p className="mt-1 text-base font-bold text-slate-900">{detail.dateSubmitted}</p>
              </div>
            </div>
            <StatusBadge label={detail.currentStatus} tone={statusToTone(detail.currentStatus)} solid />
          </div>

          <div className="pt-6">
            <StatusStepper steps={detail.steps} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-bold text-slate-900">Request Details</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Original Flight</dt>
                <dd className="mt-1 font-semibold text-slate-800">{detail.originalFlightLabel}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Passenger</dt>
                <dd className="mt-1 font-semibold text-slate-800">{detail.passengerName}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Refund Method</dt>
                <dd className="mt-1 font-semibold text-slate-800">{detail.refundMethodLabel}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Estimated Processing Time
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">{detail.estimatedProcessingTime}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Reason</dt>
                <dd className="mt-1 font-semibold text-slate-800">{detail.reason}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Estimated Amount</dt>
                <dd className="mt-1 font-bold text-brand-700">${detail.estimatedAmount.toFixed(2)} USD</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-bold text-slate-900">Manage Request</h2>
            <p className="mt-3 text-sm text-slate-500">
              If you have changed your mind or wish to select an alternative option like Rebooking, you
              can cancel this refund request before it is processed.
            </p>

            {detail.cancelWindowLabel && (
              <div className="mt-4 flex gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>{detail.cancelWindowLabel}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelling}
              className="focus-ring mt-4 w-full rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelling ? "Cancelling..." : "Cancel Refund Request"}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}