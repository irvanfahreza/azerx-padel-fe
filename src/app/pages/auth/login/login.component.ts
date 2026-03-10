import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  
  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.email || !this.password) {
      this.errorMsg = 'Harap isi semua kolom';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Email atau kata sandi salah.';
      }
    });
  }
}
