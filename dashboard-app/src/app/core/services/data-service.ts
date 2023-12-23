import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPayeeService {
  private payeeDetails = new BehaviorSubject<any>({});
  public payeeFetch;

  constructor() { }

  payeeDetails$ = this.payeeDetails.asObservable();

  changePayeeDetails(payee){
    this.payeeDetails.next(payee);
  }

}
