import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUtil } from '@app/app.util';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-user-name',
  templateUrl: './forgot-user-name.component.html',
  styleUrls: ['./forgot-user-name.component.scss']
})
export class ForgotUserNameComponent implements OnInit {

  forgotUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    ) { }

  ngOnInit(): void {
    this.forgotUserForm = this.formBuilder.group({
      mobile:  ['', [ Validators.required, Validators.minLength(10) ] ],
      emailId: ['', [ Validators.required, Validators.email, Validators.maxLength(50) ] ]
    });
  }

  mobileNumValidator(event: any){
    AppUtil.numericValidators(event);
  }

  get form() { return this.forgotUserForm.controls; }

  onforgotUser() {

    if (this.forgotUserForm.invalid) {
        return;
    }else{
      this.router.navigateByUrl('app-login/login');
    }
  }

  goBackToLogin(){
    this.authService.redirectToLogIn();
  }

}
