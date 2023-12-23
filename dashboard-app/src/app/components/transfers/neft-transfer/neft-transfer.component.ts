import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '@app/app.constants';
import { Router } from '@angular/router';
import DataJson from '@assets/configs/data.json';
import { HttpService } from '@app/core/services/http.service';
import { NewPayeeService } from '@app/core/services/data-service';
import { AuthenticationService } from '@app/core/services/authentication.service';


@Component({
  selector: 'app-neft-transfer',
  templateUrl: './neft-transfer.component.html',
  styleUrls: ['./neft-transfer.component.scss']
})
export class NeftTransferComponent implements OnInit {
  neftTransactionType: any;
  payeeData: any;
  NetworkType: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private httpServ: HttpService,
    private payeeService: NewPayeeService,
  ) { }

  formTemplate = [
    {
      "page": {
        "formField": [
          {
            "key": "Currency",
            "value": "usd",
            "ui": {
              "label": "Currency",
              "placeholder": "",
              "class": "col-md-2 pr-0",
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Currency Required"
                },

                {
                  "pattern": /^[a-zA-Z0-9 \'\-]+$/,
                  "name": "hasAlphaNumeric",
                  "message": "Accepts only Alphanumeric values"
                }
              ],
            },
            "required": "true",
            "controlType": "select",
            "type": "select",
            "options": [{ "key": "USD", "value": "usd" }, { "key": "INR", "value": "inr" }]
          },
          {
            "key": "Amount",
            "value": "",
            "ui": {
              "label": "Amount",
              "class": "col-md-4 pr-3",
              "placeholder": "Amount"
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Amount Required"
                },
                {
                  "pattern": /^\d*\.?\d*$/,
                  "name": "hasNumber",
                  "message": "Accept only Numbers"
                },

              ],
            },
            "controlType": "text",
            "type": "textBox",
            "options": {}
          },
          {
            "key": "Transaction Type",
            "value": "oneTime",
            "ui": {
              "label": "transactionType",
              "class": "col-md-6",
              "placeholder": ""
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": ""
                }
              ],
            },
            "controlType": "radio",
            "type": "radioButton",
            "options": [{ "key": "One Time", "value": "oneTime" }, { "key": "Schedule", "value": "schedule" }]
          },
          {
            "key": "Transaction Date",
            "value": "",
            "ui": {
              "label": "Transaction Date",
              "class": "col-md-6 date-field",
              "placeholder": "Transaction Date"
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Transaction Date required"
                }
              ],
            },
            "controlType": "date",
            "type": "textBox",
            "options": {}
          },
          {
            "key": "Remarks",
            "value": "",
            "ui": {
              "label": "Remarks",
              "class": "col-md-6",
              "placeholder": "Remarks"
            },
            "validations": {
              "ui": [
                {
                  "pattern": '',
                  "name": "required",
                  "message": "Remarks Required"
                },
                {
                  "pattern": '',
                  "name": "hasText",
                  "message": "Accept only text"
                },
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
                  "class": "mr-2  btn-cancel mr-3",
                },
                "type": "button"
              },
              {
                "ui": {
                  "label": "Continue",
                  "class": "mr-2  btn-save",
                },
                "type": "submit"
              }
            ]
          }
        ]
      }
    }
  ];

  ngOnInit(): void {
    this.NetworkType = this.formBuilder.group({
      neftNetworkType: ['withinBank', [Validators.required]]
    });

    this.payeeService.payeeDetails$.subscribe((data) => {
      this.payeeData = data;
    });

    this.neftTransactionType = this.formBuilder.group({
      transactionAmount: ['', [Validators.required, Validators.maxLength(8)]],
      TransactionRemark: [' ', [Validators.required, Validators.maxLength(50)]],
      neftTransactionDate: ['', [Validators.required]],
      neftTransactionType: ['OneTime', [Validators.required]]
    });
  }

  get form() { return this.neftTransactionType.controls; }

  saveOutput(eve: any) {
    this.neftTransactionType = eve;
    this.payeeService.payeeDetails$.subscribe((data) => {
      this.payeeData = data;
      this.fundTransferAPI();
    });
  }


  fundTransferAPI() {
    const body = {
      accountNumber: this.payeeData.accountNumber ? this.payeeData.accountNumber : '',
      amount: this.neftTransactionType.amount ? this.neftTransactionType.amount : '',
      currency: this.neftTransactionType.Currency ? this.neftTransactionType.Currency : '',
      payeeDetails: {
        networkType: this.payeeData.network ? this.payeeData.network : '',
        network: this.payeeData.network ? this.payeeData.network : '',
        payeeName: this.payeeData.payeeName ? this.payeeData.payeeName : '',
        nickName: this.payeeData.nickName ? this.payeeData.nickName : '',
        payeeAccountNumber: this.payeeData.accountNumber ? this.payeeData.accountNumber : '',
        payeeAccountType: this.payeeData.accountType ? this.payeeData.accountType : '',
        payeeBankCode: this.payeeData.bankCode ? this.payeeData.bankCode : '',
      }
    };
    this.httpServ.post(AppConstants.API_ENDPOINTS.FUND_TRANSFER.NEFT_TRANSFER, body)
      .subscribe(
        response => {
          if (response.httpStatus === AppConstants.STATUS_CODE.CREATED) {
          }
        });
  }
  
  newPayeeNavigate() {
    this.router.navigateByUrl(`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER}/${AppConstants.APP_URLS.SUB_URLS.NEW_PAYEE}`, { state: { networkType: this.NetworkType.value?.neftNetworkType } });
  }

  navigateToDashboard() {
    this.authService.navigateToURL(AppConstants.APP_URLS.SUB_URLS.DASHBOARD);
  }

}
