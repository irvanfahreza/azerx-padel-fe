export interface Court {
  id: number;
  name: string;
  description: string;
  pricePerHour: number;
  imageUrl: string;
  status: string;
}

export interface CourtSchedule {
  id: number;
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
