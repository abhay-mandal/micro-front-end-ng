import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@app/core/services/http.service';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { AppUtil } from '@app/app.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  @Output() loginEvent: EventEmitter<string> = new EventEmitter();

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpServ: HttpService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      phone1: ['', [Validators.required, Validators.minLength(10)]],
      email1: ['', [Validators.required, Validators.email]],
      userId: ['', [Validators.required, Validators.maxLength(35)]],
      userName: ['', [Validators.required, Validators.maxLength(35)]],
      addInfo1: ['', [Validators.required, Validators.maxLength(35)]],
      // addInfo2: ['', [Validators.required, Validators.maxLength(35)]],
      // isSmsPhone1: ['Y', [Validators.required]],
      // email2: ['', [Validators.required, Validators.email]],
      // addr1: ['', [Validators.required, Validators.maxLength(35)]],
      // addr2: ['', [Validators.required, Validators.maxLength(35)]],
      // isSmsPhone2: ['N', [Validators.required]],
      // isUssd: ['Y', [Validators.required]],
      // phone2: ['', [Validators.required, Validators.minLength(10)]],
      // extIdentifier: ['', [Validators.required, Validators.maxLength(35)]],
      // dateOfBirth: ['', [Validators.required]],
      // isSecSms: ['N', [Validators.required]],
    });
  }

  mobileNumValidator(event: any){
    AppUtil.numericValidators(event);
  }

  get form() { return this.registerForm.controls; }

  formatDate(date) {
    return `${date?.year}-${this.padNumber(date?.month)}-${this.padNumber(date?.day)}`.toString();
  }

  padNumber(value) {
    return `0${value}`.slice(-2);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    } else {
      const body = {
        userDetails: {
          // devices: {
          //   deviceName: DataJson.API_BODY.DEVICE_ID,
          //   deviceId: DataJson.API_BODY.DEVICE_ID
          // },
          // smsRequiredPhone1: this.form.isSmsPhone1.value,
          // smsRequiredPhone2: this.form.isSmsPhone2.value,
          // ussdRequired: this.form.isUssd.value,
          // profilePic: '',
          // extIdentifier: this.form.extIdentifier.value,
          phone1: this.form.phone1.value,
          email1: this.form.email1.value,
          // phone2: this.form.phone2.value,
          // email2: this.form.email2.value,
          userName: this.form.userName.value,
          userId: this.form.userId.value,
          // dateOfBirth: this.formatDate(this.form.dateOfBirth.value),
          // addr1: this.form.addr1.value,
          // addr2: this.form.addr2.value,
          // secondarySmsRequired: this.form.isSecSms.value,
          addInfo1: this.form.addInfo1.value,
          // addInfo2: this.form.addInfo2.value
        }
      };

      this.httpServ.post(AppConstants.API_ENDPOINTS.AUTH.REGISTERATION, body)
        .subscribe(response => {
          if (response.httpStatus == AppConstants.STATUS_CODE.CREATED) {
            this.resetForm();
            this.authService.redirectToLogIn();
          }
        });
    }
  }

  goBackToLogin(){
    this.authService.redirectToLogIn();
  }

  resetForm() {
    this.registerForm.reset();
  }

}
