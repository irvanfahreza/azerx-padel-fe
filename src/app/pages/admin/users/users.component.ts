import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { AlertService } from '../../../core/alert.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  api = inject(ApiService);
  alertService = inject(AlertService);
  
  users: any[] = [];
  loading = true;
  actionLoading = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.api.getAdminUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleActive(id: number) {
    this.alertService.confirm('Ubah Status', 'Ubah status aktif pengguna ini?', 'Ya, Ubah', 'Batal').then(res => {
      if (res.isConfirmed) {
        this.actionLoading = true;
        this.api.toggleUserActive(id).subscribe({
          next: () => {
            this.loadUsers();
            this.actionLoading = false;
            this.alertService.toast('Status berhasil diubah');
          },
          error: (err) => {
            this.alertService.error('Gagal', 'Gagal mengubah status: ' + (err.error?.message || 'Error'));
            this.actionLoading = false;
          }
        });
      }
    });
  }
}
