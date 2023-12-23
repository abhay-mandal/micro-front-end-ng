import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenNewAccountRoutingModule } from './open-new-account-routing.module';
import { OpenNewAccountComponent } from './open-new-account.component';

@NgModule({
  declarations: [OpenNewAccountComponent],
  imports: [
    CommonModule,
    OpenNewAccountRoutingModule
  ]
})
export class OpenNewAccountModule { }
