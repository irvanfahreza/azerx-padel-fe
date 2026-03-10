import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  // Auth
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) 
  },

  // Customer
  { 
    path: '', 
    loadComponent: () => import('./pages/customer/landing/landing.component').then(m => m.LandingComponent) 
  },
  { 
    path: 'courts', 
    loadComponent: () => import('./pages/customer/courts/courts.component').then(m => m.CourtsComponent) 
  },
  { 
    path: 'courts/:id', 
    loadComponent: () => import('./pages/customer/court-detail/court-detail.component').then(m => m.CourtDetailComponent) 
  },
  { 
    path: 'booking/confirm', 
    loadComponent: () => import('./pages/customer/booking-confirm/booking-confirm.component').then(m => m.BookingConfirmComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'my-bookings', 
    loadComponent: () => import('./pages/customer/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/customer/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },

  // Admin
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/courts', 
    loadComponent: () => import('./pages/admin/courts/courts.component').then(m => m.AdminCourtsComponent),
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/courts/:id/schedules', 
    loadComponent: () => import('./pages/admin/schedules/schedules.component').then(m => m.SchedulesComponent),
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/bookings', 
    loadComponent: () => import('./pages/admin/bookings/bookings.component').then(m => m.AdminBookingsComponent),
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/users', 
    loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent),
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/reviews', 
    loadComponent: () => import('./pages/admin/reviews/reviews.component').then(m => m.AdminReviewsComponent),
    canActivate: [adminGuard]
  },
  
  { path: '**', redirectTo: '' }
];
