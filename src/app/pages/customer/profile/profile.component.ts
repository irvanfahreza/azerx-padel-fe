import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  authService = inject(AuthService);
  api = inject(ApiService);
  
  user = this.authService.currentUser();
  notifications: any[] = [];
  loading = true;

  constructor() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.api.getMyNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  markAsRead(notif: any) {
    if (notif.isRead) return;
    this.api.markNotificationAsRead(notif.id).subscribe({
      next: () => {
        notif.isRead = true;
      }
    });
  }

  markAllAsRead() {
    this.loading = true;
    this.api.markAllNotificationsAsRead().subscribe({
      next: () => {
        this.loadNotifications();
      }
    });
  }
}
