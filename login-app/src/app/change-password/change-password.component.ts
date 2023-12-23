import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import DataJson from '@assets/configs/data.json';
import { AppConstants } from '@app/app.constants';
import { HttpService } from '@app/core/services/http.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastMessageService } from '@app/core/services/toast-message.service';
import { TranslateService } from '@ngx-translate/core';
import { AppUtil } from '@app/app.util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  private userId: string;
  userMessage: any = { tryAgain: '', notValidSession: '' };

  passwordStrengthColor: string;
  passwordStrengthColorSet: any = AppConstants.PASSWORD_STRENGTH_COLORS;

  showOldPswd = false;
  showNewPswd = false;
  showConfirmPswd = false;
  public formChangePassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpServ: HttpService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastMsgService: ToastMessageService,
    private translate: TranslateService
  ) {
    translate.get('changePswd').subscribe((res) => {
      this.userMessage.tryAgain = res.tryAgain;
      this.userMessage.notValidSession = res.notValidSession;
    });
  }

  get form() { return this.formChangePassword.controls; }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.userId = window.history?.state.userId;
      if (!this.userId) {
        this.toastMsgService.showToastMessageByType(
          AppConstants.ALERT_TYPE.ERROR, { shortMsg: this.userMessage.tryAgain, detail: this.userMessage.notValidSession }
        );
        setTimeout(() => {
          this.authService.redirectToLogIn();
        }, 100);
      }
    });

    this.formChangePassword = this.changePasswordForm();
  }

  showPassword(isShow: boolean, controlFlag: string) {
    this[controlFlag] = isShow;
  }

  changePasswordForm(): FormGroup {
    return this.fb.group(
      {
        oldPswd: [
          null,
          Validators.compose([Validators.required])
        ],
        newPswd: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            AppUtil.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            AppUtil.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            AppUtil.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            AppUtil.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
              hasSpecialCharacters: true
            }),
            // check whether the entered password is strong
            AppUtil.patternValidator(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=/\()%ยง!@#$%^&*])(?=.{8,})/, {
              hasAllCase: true
            }),
            Validators.minLength(8)
          ])
        ],
        renterNewPswd: [null,
           Validators.compose([Validators.required])]
      },
      {
        // check whether new password and confirm password match
        validator: AppUtil.mustMatch('newPswd', 'renterNewPswd')
      }
    );
  }

  submitNewPswd() {
    if (this.formChangePassword.invalid) {
      return;
    }
    const body = {
      userId: this.userId,
      pwd: this.form.oldPswd.value,
      newPassword: this.form.newPswd.value
    };
    this.httpServ.post(AppConstants.API_ENDPOINTS.AUTH.CHANGE_PSWD, body)
      .subscribe(response => {
        if (response.httpStatus == AppConstants.STATUS_CODE.SUCCESS) {
          this.resetForm();
          this.authService.redirectToLogIn();
        }
      });
  }

  resetForm() {
    this.formChangePassword.reset();
  }

}
