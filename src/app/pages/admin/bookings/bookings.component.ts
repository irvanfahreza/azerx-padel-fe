import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { AlertService } from '../../../core/alert.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html'
})
export class AdminBookingsComponent implements OnInit {
  api = inject(ApiService);
  alertService = inject(AlertService);
  
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
    this.api.getAdminBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  confirmBooking(id: number) {
    this.alertService.confirm('Konfirmasi Pesanan', 'Konfirmasi pesanan lapangan ini?').then(res => {
      if (res.isConfirmed) {
        this.actionLoading = true;
        this.api.confirmAdminBooking(id).subscribe({
          next: () => {
            this.loadBookings();
            this.actionLoading = false;
            this.alertService.toast('Pesanan dikonfirmasi');
          },
          error: () => {
            this.alertService.error('Gagal', 'Gagal mengkonfirmasi. Jadwal mungkin sudah terisi.');
            this.actionLoading = false;
          }
        });
      }
    });
  }

  cancelBooking(id: number) {
    this.alertService.confirm('Batalkan Pesanan', 'Apakah Anda yakin ingin membatalkan pesanan ini secara sepihak?', 'Ya, Batalkan', 'Kembali').then(res => {
      if (res.isConfirmed) {
        this.actionLoading = true;
        this.api.cancelAdminBooking(id).subscribe({
          next: () => {
            this.loadBookings();
            this.actionLoading = false;
            this.alertService.toast('Pesanan dibatalkan');
          },
          error: () => {
            this.actionLoading = false;
            this.alertService.error('Error', 'Gagal membatalkan pesanan');
          }
        });
      }
    });
  }
}
