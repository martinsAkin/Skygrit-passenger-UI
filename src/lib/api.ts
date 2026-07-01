/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    activeRequests,
    booking,
    compensationOptions,
    currentUser,
    hotels,
    passengers,
    proposedFlight,
    rebookOptions,
    refundAmount,
    refundVoucherAmount,
  } from "../mockData/DashboardData";
  import type { ActiveRequest } from "../types/dashboardTypes";
  
  // Simulates network latency so loading states can be built/tested against this layer.
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
    getRefundQuote: () => delay({ cash: refundAmount, voucher: refundVoucherAmount }),
    getActiveRequests: () => delay(activeRequests),
  
    acceptProposedFlight: (flightId: string) =>
      delay({ success: true, flightId }, 500),
    selectRebookFlight: (flightId: string) =>
      delay({ success: true, flightId }, 500),
    selectHotel: (hotelId: string) => delay({ success: true, hotelId }, 500),
    submitRefundRequest: (_payload: {
      reason: string;
      method: "original" | "voucher";
      email: string;
      phone?: string;
    }) =>
      delay(
        {
          success: true,
          request: {
            id: `r-${Date.now()}`,
            type: "Refund Request",
            subtitle: "Full Ticket Refund",
            referenceId: `RF-${Math.floor(Math.random() * 90000 + 10000)}X`,
            dateSubmitted: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            timeSubmitted: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "Pending",
            cancellable: true,
          } satisfies ActiveRequest,
        },
        600
      ),
    submitCompensationClaim: (_payload: {
      passengerIds: string[];
      reason: string;
      optionId: string;
    }) => delay({ success: true, referenceId: `CC-${Date.now()}` }, 600),
    cancelRequest: (requestId: string) => delay({ success: true, requestId }, 400),
  };