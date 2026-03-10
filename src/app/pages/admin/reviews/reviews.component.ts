import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html'
})
export class AdminReviewsComponent implements OnInit {
  http = inject(HttpClient);
  courts: any[] = [];
  reviews: any[] = [];
  selectedCourtId: number | null = null;
  
  courtsLoading = true;
  loading = false;

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/courts`).subscribe({
      next: (data) => {
        this.courts = data;
        this.courtsLoading = false;
        if (data.length > 0) {
          this.selectedCourtId = data[0].id;
          this.loadReviews();
        }
      },
      error: () => this.courtsLoading = false
    });
  }

  loadReviews() {
    if (!this.selectedCourtId) return;
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/reviews/court/${this.selectedCourtId}`).subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
