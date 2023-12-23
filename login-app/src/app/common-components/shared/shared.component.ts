import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-component ',
  template: `<div class="container-widthSet mx-5 px-4 pt-3">
                <app-header></app-header>
                <router-outlet></router-outlet>
              </div>
  `,
  styleUrls: []
})
export class SharedComponent {

}
