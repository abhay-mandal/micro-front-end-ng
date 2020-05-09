import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  constructor() { }
  @Input() people: string;
  @Output() helloEvt: EventEmitter<string> = new EventEmitter();
  
  People: any[] = [
    { name: 'Jeff Bejos', link: "/people/jeff-bejos" },
    { name: 'Elon Musk', link: "/jeff-bejos" },
    { name: 'Warren Buffett', link: "/jeff-bejos" },
    { name: 'Bill Gates', link: "/jeff-bejos" },
    { name: 'Mukesh Ambani', link: "/jeff-bejos" }
  ];

  ngOnInit() {
    console.log("Input::", this.people);
    this.People.push({name: this.people});
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

  sayHello(){
    this.helloEvt.next();
  }

  ngOnDestroy(): void {
    window.removeEventListener('app-post-ce-add-people', this.handleEventListnerPeople, true);
  }

}
