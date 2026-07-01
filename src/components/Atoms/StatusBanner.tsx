import { AlertTriangle } from "lucide-react";

interface StatusBannerProps {
  title: string;
  message: string;
  tone?: "error" | "warning";
}

export default function StatusBanner({ title, message, tone = "error" }: StatusBannerProps) {
  const styles =
    tone === "error"
      ? "bg-red-50 border-red-100 text-red-700"
      : "bg-amber-50 border-amber-100 text-amber-800";

  return (
    <div className={`flex gap-3 rounded-xl border p-4 sm:p-5 ${styles}`} role="alert">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
}