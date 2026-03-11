import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // --- COURTS ---
  getCourts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courts`);
  }
  
  getCourtDetail(id: number, date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courts/${id}?date=${date}`);
  }

  getAdminCourts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/courts`);
  }

  createCourt(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/courts`, data);
  }

  updateCourt(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/courts/${id}`, data);
  }

  deleteCourt(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/courts/${id}`);
  }

  // --- SCHEDULES ---
  getAdminSchedules(courtId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/courts/${courtId}/schedules?date=${date}`);
  }

  createAdminSchedules(courtId: number, data: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/courts/${courtId}/schedules`, data);
  }

  // --- BOOKINGS ---
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, data);
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings/my`);
  }

  cancelMyBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookings/${id}/cancel`, {});
  }

  getAdminBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/bookings`);
  }

  confirmAdminBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/bookings/${id}/confirm`, {});
  }

  cancelAdminBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/bookings/${id}/cancel`, {});
  }

  // --- REVIEWS ---
  getCourtReviews(courtId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/court/${courtId}`);
  }

  createReview(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, data);
  }

  // --- USERS & DASHBOARD ---
  getAdminDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/dashboard`);
  }

  getAdminUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`);
  }

  toggleUserActive(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}/toggle-active`, {});
  }

  // --- NOTIFICATIONS ---
  getMyNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications/my`);
  }

  markNotificationAsRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${id}/read`, {});
  }

  markAllNotificationsAsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/read-all`, {});
  }
}
