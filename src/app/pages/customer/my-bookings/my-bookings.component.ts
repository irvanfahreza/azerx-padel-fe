import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  http = inject(HttpClient);
  
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
    this.http.get<any[]>(`${environment.apiUrl}/bookings/my`).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancelBooking(id: number) {
    if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
      this.actionLoading = true;
      this.http.put(`${environment.apiUrl}/bookings/${id}/cancel`, {}).subscribe({
        next: () => {
          this.loadBookings();
          this.actionLoading = false;
        },
        error: () => this.actionLoading = false
      });
    }
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

    this.http.post(`${environment.apiUrl}/reviews`, req).subscribe({
      next: () => {
        alert('Tanggapan berhasil dikirim!');
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
