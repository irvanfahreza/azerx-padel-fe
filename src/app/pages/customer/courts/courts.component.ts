import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courts.component.html'
})
export class CourtsComponent implements OnInit {
  api = inject(ApiService);
  courts: any[] = [];
  loading = true;

  ngOnInit() {
    this.api.getCourts().subscribe({
      next: (data) => {
        this.courts = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
