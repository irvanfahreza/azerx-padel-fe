import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);
  
  user = this.authService.currentUser();
  notifications: any[] = [];
  loading = true;

  constructor() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.http.get<any[]>(`${environment.apiUrl}/notifications/my`).subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  markAsRead(notif: any) {
    if (notif.isRead) return;
    this.http.put(`${environment.apiUrl}/notifications/${notif.id}/read`, {}).subscribe({
      next: () => {
        notif.isRead = true;
      }
    });
  }

  markAllAsRead() {
    this.loading = true;
    this.http.put(`${environment.apiUrl}/notifications/read-all`, {}).subscribe({
      next: () => {
        this.loadNotifications();
      }
    });
  }
}
