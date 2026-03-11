import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-court-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './court-detail.component.html'
})
export class CourtDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  authService = inject(AuthService);

  courtId!: number;
  court: any;
  schedules: any[] = [];
  reviews: any[] = [];
  averageRating = 0;
  
  today = new Date().toISOString().split('T')[0];
  selectedDate = this.today;
  selectedSchedule: any = null;
  bookingNotes = '';
  
  loading = true;
  schedulesLoading = false;
  bookingLoading = false;
  errorMsg = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.courtId = +params['id'];
        this.loadCourtData();
        this.loadReviews();
      }
    });
  }

  loadCourtData() {
    this.api.getCourtDetail(this.courtId, this.selectedDate).subscribe({
      next: (res) => {
        this.court = res.court;
        this.schedules = res.schedules;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  loadSchedules() {
    this.selectedSchedule = null;
    this.schedulesLoading = true;
    this.api.getCourtDetail(this.courtId, this.selectedDate).subscribe({
      next: (res) => {
        this.schedules = res.schedules;
        this.schedulesLoading = false;
      },
      error: () => this.schedulesLoading = false
    });
  }

  loadReviews() {
    this.api.getCourtReviews(this.courtId).subscribe({
      next: (res) => {
        this.reviews = res;
        if (res.length > 0) {
          const sum = res.reduce((a, b) => a + b.rating, 0);
          this.averageRating = sum / res.length;
        }
      }
    });
  }

  selectSchedule(schedule: any) {
    if (schedule.isAvailable) {
      this.selectedSchedule = schedule;
      this.errorMsg = '';
    }
  }

  confirmBooking() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedSchedule) return;

    this.bookingLoading = true;
    this.errorMsg = '';

    const req = {
      courtId: this.courtId,
      scheduleId: this.selectedSchedule.id,
      notes: this.bookingNotes
    };

    this.api.createBooking(req).subscribe({
      next: (res) => {
        this.router.navigate(['/booking/confirm'], { 
          state: { booking: res }
        });
      },
      error: (err) => {
        this.bookingLoading = false;
        this.errorMsg = err.error?.message || 'Gagal membuat pesanan. Jadwal mungkin sudah penuh.';
      }
    });
  }
}
