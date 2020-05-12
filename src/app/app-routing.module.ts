import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JeffBejosComponent } from './component/jeff-bejos/jeff-bejos.component';
import { PeopleComponent } from './component/people/people.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    children: [
      { path: '', component: PeopleComponent },
      { path: 'jeff-bejos', component: JeffBejosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
