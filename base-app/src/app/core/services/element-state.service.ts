import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementStateService {

  constructor() { }

  private state$ = new Subject();
  private clients = HTMLElement as {};

  public registerClient(client: HTMLElement) {
    this.clients[client?.localName] = client;
  }

  // public setState(state: string) {
  //   for (let client of this.clients) {
  //     client.setAttribute('state', state);
  //   }
  // }

  get getClients() {
    return this.clients;
  }
}
