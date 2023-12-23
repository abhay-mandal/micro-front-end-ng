import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppUtil } from '@app/app.util';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formJSON: any;
  @Input() bankCodes: any[];
  findBankCode: FormControl;
  @Output() saveEmitter = new EventEmitter();
  myFormGroup: FormGroup;
  myFormGroupSubs: Subscription;
  submitted = false;
  isShowExtraInputField = false;
  openStatus = false;
  validators = [];
  validations: any;

  constructor() { }

  ngOnInit() {
    this.formLoad();
  }

  formLoad() {
    const group = {};
    this.formJSON.forEach(inputTemplate => {
      if (inputTemplate.type !== 'button' && inputTemplate.type !== 'dateInput') {  /// dateInput needs to be removed
        this.validations = inputTemplate.validations;
        group[inputTemplate.key] = new FormControl(inputTemplate.value, this.validatePattern(this.validations.ui));
        if (inputTemplate.validations?.validators) {
          this.validators = inputTemplate.validations?.validators;
        }
      }
    });
    this.myFormGroup = new FormGroup(group);
    if (this.validators.length) {
      for (const validatorVal of this.validators) {
        Object.values(validatorVal).forEach((value) => {
          this.myFormGroup.setValidators(AppUtil.mustMatch(value[0], value[1]));
        });
      }
    }
  }

  get form() { return this.myFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.myFormGroup.invalid) {
      return;
    }
    this.saveEmitter.emit(this.myFormGroup.value);
    this.myFormGroup.reset();
  }

  clearForm() {
    this.myFormGroup.reset();
    this.formLoad();
  }

  toggleExtraInputField() {
    this.isShowExtraInputField = !this.isShowExtraInputField;
  }

  // openSelect() {
  //   this.openStatus = !this.openStatus;
  //   var element = document.getElementById('names');
  //   if (this.openStatus) {
  //     element['size'] = element['length'];
  //   }
  //   else {
  //     element['size'] = 1;
  //   }
  // }

  handleChange(bankCode, control) {
    this.form[control].setValue(bankCode);
    this.toggleExtraInputField();
  }

  validatePattern(validatePatternArray: any): any {
    const validateArray = [];

    validatePatternArray.forEach(element => {
      if (element.pattern !== '') {
        switch (element.name) {
          case 'hasAlphaNumeric':
            validateArray.push(Validators.required, AppUtil.patternValidator(element.pattern, { hasAlphaNumeric: true }));
            break;
          case 'hasNumber':
            validateArray.push(Validators.required, AppUtil.patternValidator(element.pattern, { hasNumber: true }));
            break;
          case 'hasSpecialCharacters':
            validateArray.push(Validators.required, AppUtil.patternValidator(element.pattern, { hasSpecialCharacters: true }));
            break;
          case 'hasSmallCase':
            validateArray.push(Validators.required, AppUtil.patternValidator(element.pattern, { hasSmallCase: true }));
            break;
          case 'hasLetters':
            validateArray.push(Validators.required, AppUtil.patternValidator(element.pattern, { hasLeeters: true }));
            break;

          default:
            break;
        }
      }
    });

    return validateArray;
  }

}
