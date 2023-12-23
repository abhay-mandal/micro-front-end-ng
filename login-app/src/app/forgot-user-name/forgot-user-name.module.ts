import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotUserNameRoutingModule } from './forgot-user-name-routing.module';
import { ForgotUserNameComponent } from './forgot-user-name.component';


@NgModule({
  declarations: [ForgotUserNameComponent],
  imports: [
    CommonModule,
    ForgotUserNameRoutingModule
  ]
})
export class ForgotUserNameModule { }
