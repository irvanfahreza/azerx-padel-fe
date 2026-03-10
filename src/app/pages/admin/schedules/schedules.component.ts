import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  
  courtId!: number;
  schedules: any[] = [];
  selectedDate = new Date().toISOString().split('T')[0];
  loading = true;
  actionLoading = false;
  
  showBulkModal = false;
  bulkForm = { start: '08:00', end: '22:00' };

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.courtId = +params['id'];
        this.loadSchedules();
      }
    });
  }

  loadSchedules() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/admin/courts/${this.courtId}/schedules?date=${this.selectedDate}`).subscribe({
      next: (data) => {
        this.schedules = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openBulkModal() {
    this.showBulkModal = true;
  }

  generateSchedules(e: Event) {
    e.preventDefault();
    this.actionLoading = true;
    
    // Convert 08:00 to 08:00:00 format
    const requests = [];
    const startHour = parseInt(this.bulkForm.start.split(':')[0]);
    const endHour = parseInt(this.bulkForm.end.split(':')[0]);
    
    for (let i = startHour; i < endHour; i++) {
      const s = i.toString().padStart(2, '0') + ':00:00';
      const e = (i + 1).toString().padStart(2, '0') + ':00:00';
      requests.push({
        date: this.selectedDate,
        startTime: s,
        endTime: e,
        isAvailable: true
      });
    }

    this.http.post(`${environment.apiUrl}/admin/courts/${this.courtId}/schedules`, requests).subscribe({
      next: () => {
        this.showBulkModal = false;
        this.actionLoading = false;
        this.loadSchedules();
      },
      error: () => this.actionLoading = false
    });
  }
}
