import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(event) {
    this.subject.next(event)
  }

  getMsg() {
    return this.subject.asObservable()
  }
}
