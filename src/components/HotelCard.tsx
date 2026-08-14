import { Bed, Coffee, MapPin, Waves, Wifi } from "lucide-react";
import type { Hotel } from "../types/dashboardTypes";

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  "Free Wi-Fi": Wifi,
  "24/7 Shuttle": Bed,
  "Hourly Shuttle": Bed,
  Pool: Waves,
  Breakfast: Coffee,
};

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotelId: string) => void;
  selecting?: boolean;
}

export default function HotelCard({ hotel, onSelect, selecting }: HotelCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img src={hotel.imageUrl} alt={hotel.name} className="h-full w-full object-cover" />
        {hotel.closestToAirport && (
          <span className="absolute left-4 top-4 rounded-full bg-blue-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Closest to Airport
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {hotel.distanceFromAirport}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.map((amenity) => {
            const Icon = AMENITY_ICONS[amenity] ?? Wifi;
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {amenity}
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onSelect(hotel.id)}
          disabled={selecting}
          className="focus-ring mt-5 w-full rounded-lg bg-[#0D47A1] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {selecting ? "Booking..." : "Select Hotel"}
        </button>
      </div>
    </div>
  );
}