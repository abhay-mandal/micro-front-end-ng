import { AppConstants } from './app.constants';
import { FormGroup } from '@angular/forms';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class AppUtil {

  static numericValidators(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /*
   * This method returns color "green", "orange" or "red" based the on the strength of the password "strong", "medium" or
   * "weak" respectively.
   * @param value @String Password value
   * @return Color @String Color based on the strength of password
  */



  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup):ValidationErrors => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

}
