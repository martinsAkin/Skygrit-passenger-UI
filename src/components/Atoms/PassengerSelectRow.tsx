import type { Passenger } from "../../types/dashboardTypes";

interface PassengerSelectRowProps {
  passenger: Passenger;
  selected: boolean;
  onToggle: (id: string) => void;
}

export default function PassengerSelectRow({ passenger, selected, onToggle }: PassengerSelectRowProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
        selected ? "border-brand-600 bg-brand-50/60 ring-1 ring-brand-600" : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(passenger.id)}
        className="focus-ring h-5 w-5 shrink-0 rounded border-slate-300 text-brand-700"
      />
      <div>
        <p className="font-semibold text-slate-900">{passenger.name}</p>
        <p className="text-sm text-slate-500">
          {passenger.type} &bull; eTicket: {passenger.eTicket}
        </p>
      </div>
    </label>
  );
}