import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BedDouble, Info } from "lucide-react";
import PageContainer from "../components/PageContainer";
import BackLink from "../components/Atoms/BackLink";
import LoadingState from "../components/Atoms/LoadingState";
import HotelCard from "../components/HotelCard";
import { api } from "../lib/api";
import { accommodationStay } from "../mockData/DashboardData";
import type { Hotel } from "../types/dashboardTypes";

export default function RequestAccommodationPage() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  useEffect(() => {
    api.getHotels().then((res) => {
      setHotels(res);
      setLoading(false);
    });
  }, []);

  async function handleSelect(hotelId: string) {
    setSelectingId(hotelId);
    const res = await api.selectHotel(hotelId);
    setSelectingId(null);
    navigate("/accommodation/confirmed", { state: { result: res.result } });
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingState label="Finding nearby hotels..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <BackLink />

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Select Accommodation</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Your overnight delay entitles you to a complimentary hotel stay for {accommodationStay.guests}{" "}
            Adult on {accommodationStay.checkInDate}.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-surface-alt p-4 text-sm text-brand-800">
          <BedDouble className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Accommodation details:</span> {accommodationStay.guests} Adult
            &bull; 1 Room &bull; {accommodationStay.nights} Night (Check-in: {accommodationStay.checkInDate}
            , Check-out: {accommodationStay.checkOutDate})
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={handleSelect}
              selecting={selectingId === hotel.id}
            />
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-400 sm:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Hotel allocation covers room charges and applicable taxes for one night. Incidental charges,
            room service, and other extras are the passenger's responsibility.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}