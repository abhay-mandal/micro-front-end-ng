import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {
  // selectedLanguage = 'en';


  private ownAccounts: any[] = [
    { name: 'DA', bank: 'XAC Bank' },
    { name: 'DVC', bank: 'XAC Bank' },
    { name: 'SD', bank: 'City Bank' },
    { name: 'EE', bank: 'HDFC Bank' },
    { name: 'RR', bank: 'XAC Bank' },
    { name: 'TR', bank: 'XAC Bank' },
    { name: 'DU', bank: 'XAC Bank' }
  ];
  private otherAccounts: any[] = [
    { name: 'DD', bank: 'XAC Bank' },
    { name: 'DC', bank: 'XAC Bank' },
    { name: 'SD', bank: 'City Bank' },
    { name: 'EE', bank: 'HDFC Bank' },
    { name: 'RR', bank: 'XAC Bank' },
    { name: 'TR', bank: 'XAC Bank' },
    { name: 'DU', bank: 'XAC Bank' }
  ];
  copyOfOwnAccounts: any[];
  copyOfOtherAccounts: any[];
  queryOwnAc: FormControl = new FormControl();
  queryOtherAc: FormControl = new FormControl();
  isSearchDataAvailable = false;


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.copyOfOwnAccounts = [...this.ownAccounts];
    this.copyOfOtherAccounts = [...this.otherAccounts];

    // search bar for accounts - Takes input from formcontrol query string
    this.queryOwnAc.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(query => this.prepareQuery(query, 'ownAccounts', 'copyOfOwnAccounts'));

    // search bar for accounts - Takes input from formcontrol query string
    this.queryOtherAc.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(query => this.prepareQuery(query, 'otherAccounts', 'copyOfOtherAccounts'));
  }

  /*
     Prepare search query and check if empty
     @terms- query string
     @accounts- reference of original array
     @copyOfAccounts- reference of copied array
   */
  prepareQuery(query: string, accounts: string, copyOfAccounts: string) {
    query = query.trim();
    if (!query.length) {
      this[copyOfAccounts] = [...this[accounts]];
      return;
    }
    this.searchEntries(query, accounts)
      .subscribe(results => {
        this[copyOfAccounts] = results;
        this.isSearchDataAvailable = true;
      });
  }

  /*
    search based on query string
    @terms- query string
    @accounts- reference of original array
  */
  searchEntries(terms: string, accounts: string): Observable<any> {
    const subject = new BehaviorSubject<any[]>([]);
    const filteredAccount = this[accounts].filter(account => account.name.toLowerCase().includes(terms.toLowerCase()));
    subject.next([...filteredAccount]);
    return subject.asObservable();
  }

  newPayee(){
    this.router.navigate([`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER}/${AppConstants.APP_URLS.SUB_URLS.NEW_PAYEE}`]);
  }

}
