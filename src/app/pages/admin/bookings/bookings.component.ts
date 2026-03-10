import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html'
})
export class AdminBookingsComponent implements OnInit {
  http = inject(HttpClient);
  bookings: any[] = [];
  loading = true;
  actionLoading = false;
  
  tabs = ['Semua', 'PENDING', 'CONFIRMED', 'CANCELLED'];
  activeTab = 'PENDING';

  get filteredBookings() {
    if (this.activeTab === 'Semua') return this.bookings;
    return this.bookings.filter(b => b.status === this.activeTab);
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/admin/bookings`).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  confirmBooking(id: number) {
    if (confirm('Konfirmasi pesanan ini?')) {
      this.actionLoading = true;
      this.http.put(`${environment.apiUrl}/admin/bookings/${id}/confirm`, {}).subscribe({
        next: () => {
          this.loadBookings();
          this.actionLoading = false;
        },
        error: () => {
          alert('Gagal mengkonfirmasi. Jadwal mungkin sudah terisi.');
          this.actionLoading = false;
        }
      });
    }
  }

  cancelBooking(id: number) {
    if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini secara sepihak?')) {
      this.actionLoading = true;
      this.http.put(`${environment.apiUrl}/admin/bookings/${id}/cancel`, {}).subscribe({
        next: () => {
          this.loadBookings();
          this.actionLoading = false;
        },
        error: () => this.actionLoading = false
      });
    }
  }
}
