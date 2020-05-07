import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  @Input() people: string;
  @Output() helloEvt: EventEmitter<string> = new EventEmitter();
  
  People: any[] = [
    { name: 'Jeff Bejos' },
    { name: 'Elon Musk' },
    { name: 'Warren Buffett' },
    { name: 'Bill Gates' },
    { name: 'Mukesh Ambani' }
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
