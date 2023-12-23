import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@app/core/services/http.service';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '@app/core/services/authentication.service';
import moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpServ: HttpService,
    private authService: AuthenticationService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  get form() { return this.loginForm.controls; }

  showLoginPassword(isShow: boolean, controlFlag: string) {
    this[controlFlag] = isShow;
  }

  onLogin() {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const body = {
      timestamp,   // '2020-04-23 18:09:11',
      userId: this.form.userId.value,
      pwd: this.form.password.value
    };
    // this.httpServ.post(AppConstants.API_ENDPOINTS.AUTH.LOGIN, body)
    //   .subscribe(
    //     response => {
    //     if (response?.status == AppConstants.HTTP_MESSAGE_TYPE.SUCCESS && response.httpStatus == AppConstants.STATUS_CODE.SUCCESS) {
    //       this.authService.setLoginSession = true;
    //       this.authService.setUserId = body.userId;
    //       this.resetForm();
    //     }
    //   });
    const serverNonceAndToken = { bearerToken: 'abc', safeToken: 'abc', sessionToken: 'abc', serverNonce: 'abc' };
    this.authService.setServerNonceAndToken = serverNonceAndToken;
    this.authService.setLoginSession = true;
    this.authService.setUserId = body.userId;
    this.resetForm();
  }

  resetForm() {
    this.loginForm.reset();
  }

  forgotUserId() {
    this.router.navigateByUrl('app-login/forgot-username');
  }

  forgotPswd() {
    this.router.navigateByUrl('app-login/forgot-password');
  }

}
