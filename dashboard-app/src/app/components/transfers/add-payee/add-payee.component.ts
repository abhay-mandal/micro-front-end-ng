import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from '@app/core/services/http.service';
import DataJson from '@assets/configs/data.json';
import { AppConstants } from '@app/app.constants';
import { NewPayeeService } from '@app/core/services/data-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.scss']
})
export class TransferNewPayeeComponent implements OnInit {
  bankCodes: any;
  formTemplate = [
    {
      "page": {
        "title": "Add payee",
        "formField": [
          {
            "key": "networkType",
            "value": "withinBank",
            "ui": {
              "label": "Network Type",
              "class": "col-md-6",
              "placeholder": "Network Type"
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Account number Required"
                },

              ],
            },
            "controlType": "radio",
            "type": "radioButton",
            "options": [{ "key": "Within Bank", "value": "withinBank" }, { "key": "Within Country", "value": "withinCountry" }, { "key": "Intetrnational Transfer", "value": "internationalTransfer" }]
          },
          {
            "key": "network",
            "value": "NEFT",
            "ui": {
              "label": "Network",
              "placeholder": "",
              "class": "col-md-6",
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Account number Required"
                },
                {
                  "pattern": '',
                  "name": "hasText",
                  "message": "Accept only text"
                },
                {
                  "pattern": '',
                  "name": "mustMatch",
                  "message": "Re-enter Account number must match"
                },
                {
                  "pattern": '',
                  "name": "hasAlphaNumeric",
                  "message": "Accepts only Alphanumeric values"
                }
              ],
            },
            "required": "true",
            "controlType": "select",
            "type": "select",
            "options": [{ "key": "neft", "value": "NEFT" }, { "key": "BECS", "value": "BECS" }]
          },
          {
            "key": "payeeName",
            "value": "",
            "ui": {
              "label": "Payee Name",
              "class": "col-md-6",
              "placeholder": "Payee Name"
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Payee Name  Required"
                },
                {
                  "pattern": /^[A-Za-z -]+$/,
                  "name": " hasLetters",
                  "message": "Accepts only alphabets"
                },
              ],
            },
            "controlType": "text",
            "type": "textBox",
            "options": {}
          },
          {
            "key": "nickName",
            "value": "",
            "ui": {
              "label": "Nick Name",
              "class": "col-md-6",
              "placeholder": "Nick Name"
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Nick name Required"
                },
                {
                  "pattern": /^[A-Za-z -]+$/,
                  "name": " hasLetters",
                  "message": "Accepts only alphabets"
                },
              ],
            },
            "controlType": "text",
            "type": "textBox",
            "options": {}
          },
          {
            "key": "accountNumber",
            "ui": {
              "label": "Account Number",
              "class": "col-md-6",
              "placeholder": "Account Number"
            },
            "validations": {
              // 
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Account number Required"
                },
                {
                  "pattern": /^\d*\.?\d*$/,
                  "name": "hasNumber",
                  "message": "Accepts only Numerical values"
                }
              ],
            },
            "controlType": "text",
            "type": "textBox",
          },
          {
            "key": "reEnterAccountNumber",
            "ui": {
              "label": "Re-Enter Account number",
              "class": "col-md-6",
              "placeholder": "Re-Enter Account Number"
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Account number Required"
                },
                {
                  "pattern": '',
                  "name": "hasText",
                  "message": "Accept only text"
                },
                {
                  "pattern": '',
                  "name": "mustMatch",
                  "message": "Re-enter Account number must match"
                },
                {
                  "pattern": /^\d*\.?\d*$/,
                  "name": "hasNumber",
                  "message": "Accepts only Numerical values"
                }
              ],
              "validators": [
                { "mustMatch": ['accountNumber', 'reEnterAccountNumber'] }
              ]
            },
            "controlType": "text",
            "type": "textBox",
          },
          {
            "key": "accountType",
            "value": "Saving",
            "ui": {
              "label": "Account Type",
              "class": "col-md-6",
              "placeholder": "Account Type"
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Account number Required"
                },
                {
                  "pattern": '',
                  "name": "hasText",
                  "message": "Accept only text"
                },
                {
                  "pattern": '',
                  "name": "mustMatch",
                  "message": "Re-enter Account number must match"
                },
                {
                  "pattern": '',
                  "name": "hasAlphaNumeric",
                  "message": "Accepts only Alphanumeric values"
                }
              ],
            },
            "required": "true",
            "controlType": "select",
            "type": "select",
            "options": [{ "key": "saving", "value": "Saving" }, { "key": "current", "value": "Current" }]
          },
          {
            "key": "bankCode",
            "value": "",
            "ui": {
              "label": "Bank Code",
              "class": "col-md-6",
              "placeholder": "Sort Code",
              "inputGroup": "Find bank code"
            },
            "validations": {

              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Bank code Required"
                },
                {
                  "pattern": '',
                  "name": "hasText",
                  "message": "Accept only text"
                },
                {
                  "pattern": '',
                  "name": "mustMatch",
                  "message": "Re-enter Account number must match"
                },
                {
                  "pattern": /^[a-zA-Z0-9 \'\-]+$/,
                  "name": "hasAlphaNumeric",
                  "message": "Accepts only Alphanumeric values"
                }
              ],
            },
            "controlType": "text",
            "type": "textBox",
            "options": {}
          },
          {
            "type": "button",
            "ui": {
              "class": "col-md-12 mt-4",
            },
            "buttons": [
              {
                "ui": {
                  "label": "Cancel",
                  "class": "mr-2 btn-cancel pr-2",
                },
                "type": "button"
              },
              {
                "ui": {
                  "label": "Add",
                  "class": "mr-2 btn-save",
                },
                "type": "submit"
              }
            ]
          }
        ]
      }
    }
  ];

  selcetedNetworkType: string;
  private validationBol = true;

  constructor(
    private router: Router,
    private httpServ: HttpService,
    private authService: AuthenticationService,
    private newPayee: NewPayeeService
  ) { }

  ngOnInit() {
    this.selcetedNetworkType = window.history?.state.networkType;
    if (this.selcetedNetworkType) {
      this.formTemplate[0].page.formField.forEach(inputElem => {
        if (inputElem.type === 'radioButton') {
          inputElem.value = this.selcetedNetworkType;
        }
      });
    }

    this.bankCodes = [{ key: "HDFC Bangalore", value: "HDFCB123" }, { key: "HDFC Mumbai", value: "HDFCM123" }, { key: "HDFC Delhi", value: "HDFCD123" }];
  }

  saveOutput(formData: any) {
    this.addPayeeAPI(formData);
  }

  addPayeeAPI(formData) {
    const body = {
      payeeDetails: {
        networkType: formData.networkType,
        network: formData.network,
        payeeName: formData.payeeName,
        nickName: formData.nickName,
        payeeAccountNumber: formData.accountNumber,
        payeeAccountType: formData.accountType,
        payeeBankCode: formData.bankCode
      }
    };
    this.httpServ.post(AppConstants.API_ENDPOINTS.NEW_PAYEE.ADD_PAYEE, body)
      .subscribe(
        response => {
          if (response?.status === AppConstants.HTTP_MESSAGE_TYPE.SUCCESS) {
            this.newPayee.changePayeeDetails(formData);
            this.router.navigateByUrl(`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER}`);
          }
        });
  }

  navigateToFundTransfer() {
    // this.router.navigateByUrl(`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER}`);
    this.authService.navigateToURL(AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER);
  }

}
