import {
  accommodationStay,
  activeRequests,
  booking,
  compensationClaimEstimate,
  compensationOptions,
  currentUser,
  hotels,
  passengers,
  payoutDetails,
  proposedFlight,
  rebookOptions,
  refundMethodOptions,
  refundQuote,
  refundStatusDetail,
} from "../mockData/DashboardData";
import type {
  CompensationSubmissionResult,
  HotelBookingResult,
  RefundMethodId,
  RefundSubmissionResult,
} from "../types/dashboardTypes";

const delay = <T,>(value: T, ms = 350): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const api = {
  getCurrentUser: () => delay(currentUser),
  getBooking: () => delay(booking),
  getProposedFlight: () => delay(proposedFlight),
  getRebookOptions: () => delay(rebookOptions),
  getHotels: () => delay(hotels),
  getPassengers: () => delay(passengers),
  getCompensationOptions: () => delay(compensationOptions),
  getRefundMethodOptions: () => delay(refundMethodOptions),
  getRefundQuote: () => delay(refundQuote),
  getRefundStatus: () => delay(refundStatusDetail),
  getActiveRequests: () => delay(activeRequests),

  acceptProposedFlight: (flightId: string) =>
    delay({ success: true, flightId }, 500),
  selectRebookFlight: (flightId: string) =>
    delay({ success: true, flightId }, 500),
  selectHotel: (hotelId: string) => {
    const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
    const result: HotelBookingResult = {
      bookingReference: `HTL-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      hotel,
      checkIn: `${accommodationStay.checkInDate} \u2022 ${accommodationStay.checkInTime}`,
      checkOut: `${accommodationStay.checkOutDate} \u2022 ${accommodationStay.checkOutTime}`,
      guests: accommodationStay.guests,
      roomType: accommodationStay.roomType,
      instructions: [
        "A complimentary 24/7 shuttle bus is available from Terminal 4, Arrivals Level.",
        "Please present this booking reference and a valid ID at the hotel reception.",
        "Room charges and applicable taxes are covered by Skygrit. You may be asked to provide a credit card for incidental charges (e.g., mini-bar, room service).",
      ],
    };
    return delay({ success: true, result }, 500);
  },

  submitRefundRequest: (payload: {
    method: RefundMethodId;
    email: string;
    phone?: string;
    reason: string;
  }) => {
    const method = refundMethodOptions.find((m) => m.id === payload.method) ?? refundMethodOptions[0];
    const result: RefundSubmissionResult = {
      trackingId: `REF-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      method: method.id,
      methodLabel: method.title,
      amount: method.amount,
      email: payload.email,
    };
    return delay({ success: true, result }, 600);
  },

  getPayoutDetails: () => delay(payoutDetails),

  submitCompensationClaim: (_payload: {
    passengerIds: string[];
    reason: string;
    optionId: string;
  }) => {
    const result: CompensationSubmissionResult = {
      trackingId: `CLM-${Math.floor(Math.random() * 9000 + 1000)}-${Math.random()
        .toString(36)
        .slice(2, 5)
        .toUpperCase()}`,
      estimatedProcessingTime: compensationClaimEstimate,
    };
    return delay({ success: true, result }, 600);
  },

  cancelRequest: (requestId: string) => delay({ success: true, requestId }, 400),
  cancelRefundRequest: (requestId: string) => delay({ success: true, requestId }, 400),
};