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
}

export interface CompensationOption {
  id: string;
  title: string;
  description: string;
  icon: "voucher" | "miles";
}

export interface Booking {
  pnr: string;
  passengerName: string;
  originalFlight: Flight;
  cancellationReason?: string;
}