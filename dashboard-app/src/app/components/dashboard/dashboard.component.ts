import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  private savedTransactions: any[] = [
    { name: 'FAV1', AccountNum: ' xxx3251 ', currency: 'MNT', type: 'OWN', amount: '45,89,866' },
    { name: 'TT', AccountNum: ' xxx8761 ', currency: 'MNT', type: 'OWN', amount: '30,000' },
    { name: '13 TRANSFER', AccountNum: ' XXX3263 ', currency: 'MNT', type: 'OWN', amount: '12,00,987' },
    { name: 'MOM', AccountNum: ' XXX9251 ', currency: 'USD', type: 'OWN', amount: '4589866' },
    { name: 'TULBUR', AccountNum: ' XXX0263 ', currency: 'USD', type: 'OWN', amount: '4,866' },
    { name: '13 TRANSFER', AccountNum: ' XXX1298 ', currency: 'MNT', type: 'OWN', amount: '466' },
    { name: 'AMOGHANA', AccountNum: ' XXX3254 ', currency: 'USD', type: 'OWN', amount: '40,866' }
  ];

  copyOfsavedTransactions: any[];

  constructor( private router: Router) { }

  ngOnInit() {
   this.copyOfsavedTransactions = [...this.savedTransactions];
  }

}
