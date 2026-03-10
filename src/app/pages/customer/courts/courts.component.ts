import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courts.component.html'
})
export class CourtsComponent implements OnInit {
  http = inject(HttpClient);
  courts: any[] = [];
  loading = true;

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/courts`).subscribe({
      next: (data) => {
        this.courts = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
