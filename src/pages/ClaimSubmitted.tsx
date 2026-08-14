import { Link, useLocation } from "react-router-dom";
import { Activity, CheckCircle2, Clock } from "lucide-react";
import PageContainer from "../components/PageContainer";
import type { CompensationSubmissionResult } from "../types/dashboardTypes";

export default function ClaimSubmittedPage() {
  const location = useLocation();
  const result = (location.state as { result?: CompensationSubmissionResult } | null)?.result;

  if (!result) {
    return (
      <PageContainer>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-semibold text-slate-900">No claim submission to show</p>
          <p className="text-sm text-slate-500">
            This page only shows details right after you submit a claim. Head back to the dashboard to
            start again.
          </p>
          <Link to="/" className="focus-ring font-semibold text-brand-700 hover:text-brand-800">
            Return to Dashboard &rarr;
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Claim Submitted Successfully</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 sm:text-base">
                Your compensation claim has been received and is currently under review by our team.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Your Claim Tracking ID
            </p>
            <p className="mt-2 text-3xl font-bold text-brand-700">{result.trackingId}</p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Estimated processing time:{" "}
              <span className="font-semibold text-slate-700">{result.estimatedProcessingTime}</span>
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/compensation/status"
              className="focus-ring cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-[#0D47A1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Activity className="h-4 w-4" aria-hidden="true" />
              Track Claim Status
            </Link>
            <Link
              to="/dashboard"
              className="focus-ring cursor-pointer flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}