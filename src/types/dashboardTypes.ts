export type FlightStatus = "on-time" | "delayed" | "cancelled";

export type Tone = "red" | "amber" | "green" | "blue" | "slate";

export function statusToTone(status: string): Tone {
    switch (status.toLowerCase()) {
      case "cancelled":
      case "rejected":
        return "red";
      case "pending":
        return "amber";
      case "approved":
      case "completed":
      case "on-time":
        return "green";
      default:
        return "slate";
    }
  }

export interface Airport {
  code: string;
  city: string;
  country: string;
  terminal?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  operatedBy?: string;
  date: string; // display string, e.g. "Nov 15, 2023"
  isoDate: string; // ISO date for sorting/pagers
  departTime: string;
  arriveTime: string;
  from: Airport;
  to: Airport;
  passengers: number;
  cabinClass: string;
  aircraft?: string;
  status: FlightStatus;
  duration?: string;
  stops?: number;
  stopCode?: string;
  seatsLeft?: number;
  arrivesNextDay?: boolean;
}

export interface Passenger {
  id: string;
  name: string;
  type: "Adult" | "Child" | "Infant";
  eTicket: string;
}

export type RequestType =
  | "Refund Request"
  | "Rebooking"
  | "Accommodation"
  | "Compensation Claim";

export type RequestStatus = "Pending" | "Approved" | "Rejected" | "Completed";

export interface ActiveRequest {
  id: string;
  type: RequestType;
  subtitle: string;
  referenceId: string;
  dateSubmitted: string;
  timeSubmitted: string;
  status: RequestStatus;
  cancellable?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  imageUrl: string;
  distanceFromAirport: string;
  amenities: string[];
  closestToAirport?: boolean;
  address?: string;
}

export interface HotelBookingResult {
  bookingReference: string;
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  instructions: string[];
}

export interface CompensationOption {
  id: string;
  title: string;
  description: string;
  icon: "voucher" | "miles";
}

export interface PayoutDetails {
  method: string;
  accountHolderName: string;
  bankName: string;
  maskedAccountNumber: string;
  swiftCode: string;
}
 
export interface ClaimSelection {
  passengerIds: string[];
  reason: string;
  optionId: string;
}
 
export interface CompensationSubmissionResult {
  trackingId: string;
  estimatedProcessingTime: string;
}

export interface Booking {
  pnr: string;
  passengerName: string;
  originalFlight: Flight;
  cancellationReason?: string;
}

export type RefundMethodId = "original" | "voucher";

export interface RefundMethodOption {
  id: RefundMethodId;
  title: string;
  description: string;
  amount: number;
  bonusLabel?: string;
}

export interface RefundQuote {
  originalAmount: number;
  voucherAmount: number;
  cardLast4: string;
}

export interface RefundSubmissionResult {
  trackingId: string;
  method: RefundMethodId;
  methodLabel: string;
  amount: number;
  email: string;
}

export type RefundStepStatus = "done" | "current" | "pending";

export interface RefundStatusStep {
  label: string;
  status: RefundStepStatus;
  timestamp?: string;
}

export interface RefundStatusDetail {
  requestId: string;
  requestType: string;
  dateSubmitted: string;
  currentStatus: "In Review" | "Approved" | "Refund Issued" | "Rejected";
  steps: RefundStatusStep[];
  originalFlightLabel: string;
  passengerName: string;
  refundMethodLabel: string;
  estimatedProcessingTime: string;
  reason: string;
  estimatedAmount: number;
  cancelWindowLabel?: string;
}