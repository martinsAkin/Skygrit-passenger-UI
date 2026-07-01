import { useEffect, useRef, useState } from "react";
import { LogOut, Plane, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  userName: string;
  pnr: string;
  onSignOut?: () => void;
}

export default function Navbar({ userName, pnr, onSignOut }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 focus-ring" aria-label="Arik Air, back to dashboard">
          <ArikLogo />
        </Link>

        {/* Desktop: full identity block */}
        <div className="hidden items-center gap-4 sm:flex">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
            <p className="mt-0.5 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              PNR: {pnr}
            </p>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="focus-ring flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>

        {/* Mobile: compact menu */}
        <div className="relative sm:hidden" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="focus-ring flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-100"
          >
            <span className="max-w-27.5 truncate">{userName.split(" ")[0]}</span>
            <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
            >
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">{userName}</p>
                <p className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  PNR: {pnr}
                </p>
              </div>
              <button
                type="button"
                onClick={onSignOut}
                role="menuitem"
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function ArikLogo() {
  return (
    <div className="flex items-center gap-2">
      <Plane className="h-7 w-7 -rotate-45 text-brand-700" aria-hidden="true" />
      <div className="leading-none">
        <p className="font-serif text-xl font-bold italic tracking-tight text-brand-800">
          Arık
        </p>
        <p className="-mt-0.5 text-[10px] font-medium tracking-wide text-brand-red">
          arikair.com
        </p>
      </div>
    </div>
  );
}