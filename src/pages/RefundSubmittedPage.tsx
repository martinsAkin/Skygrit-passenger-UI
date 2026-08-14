import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Search } from "lucide-react";
import PageContainer from "../components/PageContainer";
import { api } from "../lib/api";
import type { RefundSubmissionResult } from "../types/dashboardTypes";

export default function RefundSubmittedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cancelling, setCancelling] = useState(false);

  const result = (location.state as { result?: RefundSubmissionResult } | null)?.result;

  // Someone landing here directly (refresh, bookmark, back button after navigating away)
  // won't have router state — send them somewhere useful instead of a blank/broken page.
  if (!result) {
    return (
      <PageContainer>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-semibold text-slate-900">No refund request to show</p>
          <p className="text-sm text-slate-500">
            This page only shows details right after you submit a request. Check your existing requests
            instead.
          </p>
          <Link to="/refund/status" className="focus-ring font-semibold text-brand-700 hover:text-brand-800">
            Track Refund Status &rarr;
          </Link>
        </div>
      </PageContainer>
    );
  }

  async function handleCancel() {
    setCancelling(true);
    await api.cancelRefundRequest(result!.trackingId);
    setCancelling(false);
    navigate("/dashboard");
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Refund Request Submitted</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 sm:text-base">
                We have successfully received your request for a {result.methodLabel}.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your Tracking ID</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">{result.trackingId}</p>
            <p className="mt-2 text-sm text-slate-400">Please save this ID to monitor the status of your refund.</p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-900">Request Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Refund Method</dt>
                <dd className="font-semibold text-slate-800">{result.methodLabel}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Total Amount</dt>
                <dd className="font-semibold text-brand-700">${result.amount.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Email Destination</dt>
                <dd className="font-semibold text-slate-800">{result.email}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-brand-100 bg-surface-alt p-4 text-left text-sm text-brand-800">
            <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">Cancellation Window Active</p>
              <p className="mt-1 opacity-90">
                You have up to 48 hours to cancel this request and change your refund preference. After
                this period, your {result.method === "voucher" ? "voucher" : "refund"} will be processed
                and sent.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/refund/status"
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Track Refund Status
            </Link>
            <Link
              to="/dashboard"
              className="focus-ring flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Return to Dashboard
            </Link>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            disabled={cancelling}
            className="focus-ring mt-4 block w-full text-center text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-60"
          >
            {cancelling ? "Cancelling..." : "Cancel Refund Request"}
          </button>
        </div>
      </div>
    </PageContainer>
  );
}