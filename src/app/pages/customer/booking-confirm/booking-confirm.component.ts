import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-confirm.component.html'
})
export class BookingConfirmComponent {
  router = inject(Router);
  booking: any;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['booking']) {
      this.booking = navigation.extras.state['booking'];
    } else {
      // If no state, perhaps refresh happened
      this.router.navigate(['/my-bookings']);
    }
  }
}
