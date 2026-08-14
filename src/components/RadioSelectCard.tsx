interface RadioSelectCardProps {
    selected: boolean;
    title: string;
    description: string;
    valueLabel: string;
    badge?: string;
    onSelect: () => void;
  }
  
  export default function RadioSelectCard({
    selected,
    title,
    description,
    valueLabel,
    badge,
    onSelect,
  }: RadioSelectCardProps) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`focus-ring w-full rounded-xl border p-4 text-left transition-colors sm:p-5 ${
          selected ? "border-brand-600 ring-1 ring-brand-600" : "border-slate-200 hover:bg-slate-50"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? "border-brand-700" : "border-slate-300"
              }`}
            >
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-900">{title}</p>
                {badge && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          </div>
          <p className="shrink-0 text-lg font-bold text-brand-700">{valueLabel}</p>
        </div>
      </button>
    );
  }