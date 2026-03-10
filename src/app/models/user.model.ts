export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  activeCourts: number;
  totalCustomers: number;
  averageRating: number;
  recentBookings: any[];
}
