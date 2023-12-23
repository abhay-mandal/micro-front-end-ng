import { Component, Input, SimpleChange, OnChanges } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { AppUtil } from '@app/app.util';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss']
})
export class PasswordStrengthBarComponent implements OnChanges {

  @Input() passwordToCheck: string;
  passwordStrengthColor: string;
  passwordStrengthColorSet: any = AppConstants.PASSWORD_STRENGTH_COLORS;

  constructor() { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (!changes.passwordToCheck.firstChange) {
      const password = changes.passwordToCheck.currentValue;
      this.passwordStrengthColor = AppUtil.getPaswordStrengthColor(password);
    }
  }


}
