import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-open-new-account',
  templateUrl: './open-new-account.component.html',
  styleUrls: ['./open-new-account.component.scss']
})
export class OpenNewAccountComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  goBackToLogin(){
    this.authService.redirectToLogIn();
  }

}
