import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { AlertService } from '../../../core/alert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  api = inject(ApiService);
  alertService = inject(AlertService);
  
  bookings: any[] = [];
  loading = true;
  actionLoading = false;
  
  tabs = ['Semua', 'PENDING', 'CONFIRMED', 'CANCELLED'];
  activeTab = 'Semua';

  showReviewModal = false;
  selectedBooking: any = null;
  reviewData = { rating: 0, comment: '' };
  reviewError = '';

  get filteredBookings() {
    if (this.activeTab === 'Semua') return this.bookings;
    return this.bookings.filter(b => b.status === this.activeTab);
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.api.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancelBooking(id: number) {
    this.alertService.confirm('Batal Pesanan', 'Apakah Anda yakin ingin membatalkan pesanan ini?', 'Ya, Batalkan', 'Kembali').then(res => {
      if (res.isConfirmed) {
        this.actionLoading = true;
        this.api.cancelMyBooking(id).subscribe({
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

  openReviewModal(booking: any) {
    this.selectedBooking = booking;
    this.reviewData = { rating: 0, comment: '' };
    this.reviewError = '';
    this.showReviewModal = true;
  }

  submitReview(e: Event) {
    e.preventDefault();
    this.actionLoading = true;
    this.reviewError = '';
    
    const req = {
      courtId: this.selectedBooking.courtId,
      bookingId: this.selectedBooking.id,
      rating: this.reviewData.rating,
      comment: this.reviewData.comment
    };

    this.api.createReview(req).subscribe({
      next: () => {
        this.alertService.success('Berhasil', 'Tanggapan berhasil dikirim!');
        this.showReviewModal = false;
        this.actionLoading = false;
        this.loadBookings();
      },
      error: (err) => {
        this.reviewError = err.error?.message || 'Gagal mengirim ulasan';
        this.actionLoading = false;
      }
    });
  }
}
