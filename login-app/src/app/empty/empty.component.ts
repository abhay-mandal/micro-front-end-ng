import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  template: ''
})
export class EmptyComponent {
  constructor(private authService: AuthenticationService) {
    this.authService.redirectToLogIn();
  }
}
