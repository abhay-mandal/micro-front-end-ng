import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  People: object[] = [
    { name: 'Jeff Bejos' },
    { name: 'Elon Musk' },
    { name: 'Warren Buffett' },
    { name: 'Bill Gates' },
    { name: 'Mukesh Ambani' }
  ];

  @Input() people: object;

  ngOnInit() {
    console.log("Token::", this.people);
    this.People.push(this.people);
    console.log("People::", this.People);
    window.addEventListener('app-post-ce-add-people', this.handleEventListnerPeople, true);
  }

  handleEventListnerPeople(event) {
    console.log('from app-post::', event.detail[0])
    // this.People = [...this.People, ...event.detail];
    // this.addPeople(event.detail);
  }

  addPeople(people){
    // this.People = [...this.People, {name: 'Steve Jobs'}];
    console.log('people', people);
    console.log('this.People', this.People);
    this.People.push(...people);    
  }

  ngOnDestroy(): void {
    window.removeEventListener('app-post-ce-add-people', this.handleEventListnerPeople, true);
  }

}
