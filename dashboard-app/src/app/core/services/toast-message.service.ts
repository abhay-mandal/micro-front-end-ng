import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private toastr: ToastrService) { }

  showToastMessageByType(type: string, message: any, options?: any) {
    this.toastr[type](message.detail, message.shortMsg, options);
  }
}
