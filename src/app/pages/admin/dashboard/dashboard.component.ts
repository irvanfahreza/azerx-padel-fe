import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  http = inject(HttpClient);
  stats: any;
  loading = true;

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/admin/dashboard`).subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
