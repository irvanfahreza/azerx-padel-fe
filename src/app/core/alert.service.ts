import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  
  private baseConfig = {
    background: '#080b14',
    color: '#f0f0f0',
    confirmButtonColor: '#b8ff3c',
    cancelButtonColor: 'rgba(240, 240, 240, 0.1)',
    customClass: {
      popup: 'border border-padel-white/10 rounded-2xl shadow-xl',
      title: 'text-padel-white font-display',
      htmlContainer: 'text-padel-white/70',
      confirmButton: 'text-padel-dark font-medium px-6 py-2 rounded-full !bg-padel-lime hover:!bg-[#ccff5c] focus:!ring-0 transition-colors',
      cancelButton: 'text-padel-white font-medium px-6 py-2 rounded-full hover:bg-padel-white/20 focus:!ring-0 transition-colors border border-padel-white/20'
    }
  };

  success(title: string, text?: string) {
    return Swal.fire({
      ...this.baseConfig,
      icon: 'success',
      title,
      text,
      iconColor: '#b8ff3c',
      confirmButtonText: 'Tutup'
    });
  }

  error(title: string, text?: string) {
    return Swal.fire({
      ...this.baseConfig,
      icon: 'error',
      title,
      text,
      iconColor: '#ef4444',
      confirmButtonText: 'Tutup'
    });
  }

  confirm(title: string, text?: string, confirmText = 'Ya, lanjutkan', cancelText = 'Batal') {
    return Swal.fire({
      ...this.baseConfig,
      icon: 'warning',
      title,
      text,
      iconColor: '#eab308',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true
    });
  }
  
  toast(title: string, icon: SweetAlertIcon = 'success') {
    return Swal.fire({
      ...this.baseConfig,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon,
      iconColor: icon === 'success' ? '#b8ff3c' : '#ef4444',
      title,
      customClass: {
        popup: 'border border-padel-white/10 shadow-xl !bg-padel-dark/95 backdrop-blur mt-16 mr-4',
        title: 'text-sm font-medium'
      }
    });
  }
}
