import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  http = inject(HttpClient);
  users: any[] = [];
  loading = true;
  actionLoading = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/admin/users`).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleActive(id: number) {
    if (confirm('Ubah status aktif pengguna ini?')) {
      this.actionLoading = true;
      this.http.put(`${environment.apiUrl}/admin/users/${id}/toggle-active`, {}).subscribe({
        next: () => {
          this.loadUsers();
          this.actionLoading = false;
        },
        error: (err) => {
          alert('Gagal mengubah status: ' + (err.error?.message || 'Error'));
          this.actionLoading = false;
        }
      });
    }
  }
}
