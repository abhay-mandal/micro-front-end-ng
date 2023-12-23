import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from './components/empty/empty.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FundTransferComponent } from '@app/components/transfers/fund-transfer/fund-transfer.component';
import { TransferNewPayeeComponent } from '@app/components/transfers/add-payee/add-payee.component';
import { OtherBankAccountComponent } from './components/transfers/other-bank-account/other-bank-account.component';
import { NeftTransferComponent } from './components/transfers/neft-transfer/neft-transfer.component';
import { AppConstants } from './app.constants';
// import { TabinationComponent } from './components/tabination/tabination.component';

const routes: Routes = [
  {
    path: AppConstants.APP_URLS.MAIN_URL,
    children: [
      { path: AppConstants.APP_URLS.SUB_URLS.DASHBOARD, component: DashboardComponent },
      {
        path: AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER,
        children: [
          // { path: '', component: FundTransferComponent },
          { path: '', component: NeftTransferComponent },
          { path: AppConstants.APP_URLS.SUB_URLS.NEW_PAYEE, component: TransferNewPayeeComponent },
          { path: AppConstants.APP_URLS.SUB_URLS.OTHER_BANK, component: OtherBankAccountComponent },
         ]
      },
      // { path: 'tabs', component: TabinationComponent }
    ]
  },
  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
