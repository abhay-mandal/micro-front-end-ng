import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-show-password',
  templateUrl: './show-password.component.html',
  styleUrls: ['./show-password.component.scss']
})
export class ShowPasswordComponent {

  constructor() { }

  @Output() showPswd = new EventEmitter();

  showEye = false;

  showPassword() { // You can give any function name
      this.showEye = !this.showEye;
      this.showPswd.emit(this.showEye);
  }

}
