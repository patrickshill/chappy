import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket; // socket that connects to socket.io server

  bizComponent: any;
  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.ws_url);

    // define observable which observes incoming messages from socket.io server
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server")
        this.bizComponent.getMessages();
        observer.next(data);
      })
  });

    // define observer which listens to messages from other components and sends
    // message back to socket server when next() is called
    let observer = {
      next: (data: Object) => {
          this.socket.emit('message', JSON.stringify(data));
      },
    };

    // return Rx.subject which is a combination of oberserver and observable.

    return Rx.Subject.create(observer, observable);
  }


}
