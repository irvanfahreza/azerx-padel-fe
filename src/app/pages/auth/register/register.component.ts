import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  
  model = { name: '', email: '', phone: '', password: '' };
  errorMsg = '';
  successMsg = '';
  loading = false;

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.model.name || !this.model.email || !this.model.password) {
      this.errorMsg = 'Harap isi semua kolom wajib';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    
    this.authService.register(this.model).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = 'Pendaftaran berhasil! Mengalihkan ke halaman Masuk...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Terjadi kesalahan saat pendaftaran.';
      }
    });
  }
}
