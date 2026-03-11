import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { AlertService } from '../../../core/alert.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-courts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './courts.component.html'
})
export class AdminCourtsComponent implements OnInit {
  api = inject(ApiService);
  alertService = inject(AlertService);
  
  courts: any[] = [];
  loading = true;
  actionLoading = false;
  
  showModal = false;
  isEditing = false;
  currentEditId: number | null = null;
  formError = '';

  courtForm = {
    name: '',
    description: '',
    pricePerHour: 0,
    imageUrl: 'https://images.unsplash.com/photo-1622359556819-219ee5c34e06',
    status: 'AVAILABLE'
  };

  ngOnInit() {
    this.loadCourts();
  }

  loadCourts() {
    this.loading = true;
    this.api.getAdminCourts().subscribe({
      next: (data) => {
        this.courts = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openModal() {
    this.isEditing = false;
    this.currentEditId = null;
    this.courtForm = { name: '', description: '', pricePerHour: 0, imageUrl: 'https://images.unsplash.com/photo-1622359556819-219ee5c34e06', status: 'AVAILABLE' };
    this.formError = '';
    this.showModal = true;
  }

  editCourt(court: any) {
    this.isEditing = true;
    this.currentEditId = court.id;
    this.courtForm = { ...court };
    this.formError = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCourt(e: Event) {
    e.preventDefault();
    if (!this.courtForm.name || !this.courtForm.pricePerHour) {
      this.formError = 'Nama dan harga wajib diisi.';
      return;
    }

    this.actionLoading = true;
    if (this.isEditing && this.currentEditId) {
      this.api.updateCourt(this.currentEditId, this.courtForm).subscribe({
        next: () => {
          this.closeModal();
          this.loadCourts();
          this.actionLoading = false;
        },
        error: () => this.actionLoading = false
      });
    } else {
      this.api.createCourt(this.courtForm).subscribe({
        next: () => {
          this.closeModal();
          this.loadCourts();
          this.actionLoading = false;
        },
        error: () => this.actionLoading = false
      });
    }
  }

  deleteCourt(id: number) {
    this.alertService.confirm('Hapus Lapangan', 'Yakin ingin menghapus lapangan ini?', 'Ya, Hapus', 'Batal').then(res => {
      if (res.isConfirmed) {
        this.api.deleteCourt(id).subscribe({
          next: () => {
            this.loadCourts();
            this.alertService.toast('Lapangan dihapus');
          }
        });
      }
    });
  }
}
