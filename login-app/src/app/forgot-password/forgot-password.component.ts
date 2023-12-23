import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUtil } from '@app/app.util';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPswdForm: FormGroup;
  submitted = false;
  input;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.forgotPswdForm = this.formBuilder.group({
      mobile:  ['', [ Validators.required, Validators.minLength(10)] ],
      emailId: ['', [ Validators.required, Validators.email, Validators.maxLength(50) ]],
      userId: ['', [ Validators.required, Validators.maxLength(25) ] ],
    });
  }

  mobileNumValidator(event: any){
    AppUtil.numericValidators(event);
  }

  get form() { return this.forgotPswdForm.controls; }

  onforgotPswd() {

    if (this.forgotPswdForm.invalid) {
      return;
    } else {
      this.router.navigateByUrl('app-login/login');
    }
  }


  goBackToLogin(){
    this.authService.redirectToLogIn();
  }
}
