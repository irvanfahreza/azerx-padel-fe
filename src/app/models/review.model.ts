export interface Review {
  id: number;
  userId: number;
  userName: string;
  courtId: number;
  bookingId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewRequest {
  courtId: number;
  bookingId: number;
  rating: number;
  comment: string;
}
