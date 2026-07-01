import { Activity } from "lucide-react";
import { statusToTone, type ActiveRequest } from "../types/dashboardTypes";
import StatusBadge from "../components/Atoms/StatusBadge";

interface ActiveRequestsTableProps {
  requests: ActiveRequest[];
  onCancelRequest?: (id: string) => void;
}

export default function ActiveRequestsTable({ requests, onCancelRequest }: ActiveRequestsTableProps) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-bold text-brand-700">
        <Activity className="h-5 w-5" aria-hidden="true" />
        Active Requests
      </h2>

      {requests.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          No active requests yet. Anything you submit will show up here.
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="mt-3 hidden overflow-hidden rounded-xl border border-slate-200 bg-white sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3">Request Type</th>
                  <th className="px-6 py-3">Reference ID</th>
                  <th className="px-6 py-3">Date Submitted</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brand-700">{req.type}</p>
                      <p className="text-xs text-slate-400">{req.subtitle}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{req.referenceId}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {req.dateSubmitted}
                      <br />
                      <span className="text-xs">{req.timeSubmitted}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge label={req.status} tone={statusToTone(req.status)} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.cancellable && (
                        <button
                          type="button"
                          onClick={() => onCancelRequest?.(req.id)}
                          className="focus-ring rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 opacity-60 hover:bg-slate-50"
                        >
                          Cancel Request
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-3 space-y-3 sm:hidden">
            {requests.map((req) => (
              <div key={req.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-brand-700">{req.type}</p>
                    <p className="text-xs text-slate-400">{req.subtitle}</p>
                  </div>
                  <StatusBadge label={req.status} tone={statusToTone(req.status)} />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-slate-400">Reference ID</dt>
                    <dd className="font-medium text-slate-700">{req.referenceId}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Submitted</dt>
                    <dd className="font-medium text-slate-700">{req.dateSubmitted}</dd>
                  </div>
                </dl>
                {req.cancellable && (
                  <button
                    type="button"
                    onClick={() => onCancelRequest?.(req.id)}
                    className="focus-ring mt-3 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}