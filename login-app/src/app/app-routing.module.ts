import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotUserNameComponent } from './forgot-user-name/forgot-user-name.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmptyComponent } from './empty/empty.component';
import { SharedComponent } from '@app/common-components/shared/shared.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OpenNewAccountComponent } from './open-new-account/open-new-account.component';
import { AppConstants } from './app.constants';

const routes: Routes = [
  {
    path: AppConstants.APP_URLS.MAIN_URL, component: SharedComponent,
    children: [
      { path: AppConstants.APP_URLS.SUB_URLS.LOGIN, component: LoginComponent },
      { path: AppConstants.APP_URLS.SUB_URLS.REGISTERATION, component: RegisterComponent },
      { path: AppConstants.APP_URLS.SUB_URLS.FORGOT_USER_NAME, component: ForgotUserNameComponent },
      { path: AppConstants.APP_URLS.SUB_URLS.FORGOT_PSWD, component: ForgotPasswordComponent },
      { path: AppConstants.APP_URLS.SUB_URLS.CHANGE_PSWD, component: ChangePasswordComponent},
      { path: AppConstants.APP_URLS.SUB_URLS.OPEN_NEW_ACCOUNT, component: OpenNewAccountComponent}
    ]
  },
  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
