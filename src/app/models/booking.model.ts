export interface Booking {
  id: number;
  userId: number;
  userName: string;
  courtId: number;
  courtName: string;
  scheduleId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface BookingRequest {
  courtId: number;
  scheduleId: number;
  notes: string;
}
