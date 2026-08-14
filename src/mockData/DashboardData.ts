import type {
  ActiveRequest,
  Booking,
  CompensationOption,
  Flight,
  Hotel,
  Passenger,
  RefundMethodOption,
  RefundQuote,
  RefundStatusDetail,
} from "../types/dashboardTypes";

export const currentUser = {
  name: "Michael Robertson",
  pnr: "X7B9Q2",
  email: "m.robertson@example.com",
  phone: "+1 (555) 123-4567",
};

export const passengers: Passenger[] = [
  { id: "p1", name: "Michael Robertson", type: "Adult", eTicket: "8392019284" },
];

export const originalFlight: Flight = {
  id: "sg-402",
  flightNumber: "SG-402",
  date: "Nov 15, 2023",
  isoDate: "2023-11-15",
  departTime: "08:30 AM",
  arriveTime: "20:15 PM",
  from: { code: "JFK", city: "New York", country: "USA" },
  to: { code: "LHR", city: "London", country: "UK" },
  passengers: 1,
  cabinClass: "Economy",
  status: "cancelled",
};

export const booking: Booking = {
  pnr: currentUser.pnr,
  passengerName: currentUser.name,
  originalFlight,
  cancellationReason:
    "We regret to inform you that your upcoming flight SG-402 has been cancelled due to severe weather conditions at the destination.",
};

export const proposedFlight: Flight = {
  id: "sg-405",
  flightNumber: "SG-405",
  date: "Thursday, Nov 16, 2023",
  isoDate: "2023-11-16",
  departTime: "10:00 AM",
  arriveTime: "21:45 PM",
  from: { code: "JFK", city: "New York, USA", country: "USA" },
  to: { code: "LHR", city: "London, UK", country: "UK" },
  passengers: 1,
  cabinClass: "Economy",
  aircraft: "Boeing 777",
  status: "on-time",
};

export const rebookOptions: Flight[] = [
  {
    id: "sg-410",
    flightNumber: "SG-410",
    operatedBy: "Skygrit Airlines",
    date: "Thu, Nov 16, 2023",
    isoDate: "2023-11-16",
    departTime: "10:00 AM",
    arriveTime: "10:00 PM",
    from: { code: "JFK", city: "New York", country: "USA", terminal: "Terminal 4" },
    to: { code: "LHR", city: "London", country: "UK", terminal: "Terminal 5" },
    passengers: 1,
    cabinClass: "Economy",
    status: "on-time",
    duration: "7h 00m",
    stops: 0,
    seatsLeft: 4,
  },
  {
    id: "sg-412",
    flightNumber: "SG-412",
    operatedBy: "Skygrit Airlines",
    date: "Thu, Nov 16, 2023",
    isoDate: "2023-11-16",
    departTime: "02:30 PM",
    arriveTime: "02:45 AM",
    from: { code: "JFK", city: "New York", country: "USA", terminal: "Terminal 4" },
    to: { code: "LHR", city: "London", country: "UK", terminal: "Terminal 3" },
    passengers: 1,
    cabinClass: "Economy",
    status: "on-time",
    duration: "7h 15m",
    stops: 0,
    arrivesNextDay: true,
  },
  {
    id: "sg-820",
    flightNumber: "SG-820",
    operatedBy: "Global Airways (Partner)",
    date: "Thu, Nov 16, 2023",
    isoDate: "2023-11-16",
    departTime: "08:00 AM",
    arriveTime: "11:30 PM",
    from: { code: "JFK", city: "New York", country: "USA", terminal: "Terminal 4" },
    to: { code: "LHR", city: "London", country: "UK", terminal: "Terminal 2" },
    passengers: 1,
    cabinClass: "Economy",
    status: "on-time",
    duration: "10h 30m",
    stops: 1,
    stopCode: "BOS",
  },
];

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "JFK Airport Hilton",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    distanceFromAirport: "1.2 miles from JFK",
    amenities: ["Free Wi-Fi", "24/7 Shuttle", "Breakfast"],
    closestToAirport: true,
    address: "144-02 135th Ave, Jamaica, NY 11436",
  },
  {
    id: "h2",
    name: "Marriott Courtyard",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    distanceFromAirport: "2.5 miles from JFK",
    amenities: ["Free Wi-Fi", "24/7 Shuttle", "Pool"],
    address: "135-30 140th St, Jamaica, NY 11436",
  },
  {
    id: "h3",
    name: "Holiday Inn Express",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    distanceFromAirport: "3.0 miles from JFK",
    amenities: ["Free Wi-Fi", "Hourly Shuttle", "Breakfast"],
    address: "144-15 Rockaway Blvd, Jamaica, NY 11436",
  },
];

export const compensationOptions: CompensationOption[] = [
  {
    id: "voucher",
    title: "Skygrit Travel Voucher",
    description:
      "Get a voucher worth $600 towards your next flight. Includes a +10% bonus value. Valid for 12 months.",
    icon: "voucher",
  },
  {
    id: "miles",
    title: "40,000 SkyMiles",
    description:
      "Bonus miles credited immediately to your frequent flyer account. Can be used for upgrades or flights.",
    icon: "miles",
  },
];

export const activeRequests: ActiveRequest[] = [
  {
    id: "r1",
    type: "Refund Request",
    subtitle: "Full Ticket Refund",
    referenceId: "RF-99824X",
    dateSubmitted: "Oct 24, 2023",
    timeSubmitted: "14:32 PM",
    status: "Pending",
    cancellable: true,
  },
];

export const refundAmount = 450.0;
export const refundVoucherAmount = 495.0;

export const refundQuote: RefundQuote = {
  originalAmount: refundAmount,
  voucherAmount: refundVoucherAmount,
  cardLast4: "4242",
};

export const refundMethodOptions: RefundMethodOption[] = [
  {
    id: "original",
    title: "Original Payment Method",
    description:
      "Receive a full refund to your Visa ending in 4242. Processing typically takes 5-7 business days depending on your bank.",
    amount: refundAmount,
  },
  {
    id: "voucher",
    title: "Skygrit Travel Voucher",
    description:
      "Receive travel credits instantly via email. Valid for 12 months for any future Skygrit flight booking.",
    amount: refundVoucherAmount,
    bonusLabel: "+10% Bonus",
  },
];

export const refundStatusDetail: RefundStatusDetail = {
  requestId: "REF-9824XJ",
  requestType: "Full Refund",
  dateSubmitted: "Nov 15, 2023",
  currentStatus: "In Review",
  steps: [
    { label: "Submitted", status: "done", timestamp: "Nov 15, 10:30 AM" },
    { label: "In Review", status: "current", timestamp: "Nov 16, 09:15 AM" },
    { label: "Approved", status: "pending" },
    { label: "Refund Issued", status: "pending" },
  ],
  originalFlightLabel: "SG-402 (JFK - LHR)",
  passengerName: "Michael Robertson",
  refundMethodLabel: "Original Payment (Visa **4242)",
  estimatedProcessingTime: "5-7 Business Days",
  reason: "Flight Cancellation",
  estimatedAmount: 650.0,
  cancelWindowLabel: "You have 1 day, 14 hours left to cancel this request according to airline policy.",
};

export const accommodationStay = {
  guests: 1,
  nights: 1,
  checkInDate: "Nov 15, 2023",
  checkInTime: "3:00 PM",
  checkOutDate: "Nov 16, 2023",
  checkOutTime: "12:00 PM",
  roomType: "Standard King Room",
};

export const payoutDetails = {
  method: "Bank Transfer",
  accountHolderName: currentUser.name,
  bankName: "Chase Bank",
  maskedAccountNumber: "**** **** **** 1234",
  swiftCode: "CHASUS33",
};

export const compensationClaimEstimate = "7-14 business days";