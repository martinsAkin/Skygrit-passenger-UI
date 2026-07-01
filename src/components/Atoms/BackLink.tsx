import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to?: string;
  label?: string;
}

export default function BackLink({ to = "/", label = "Back to Dashboard" }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}