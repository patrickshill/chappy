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

  constructor() { }

  connect(url): Rx.Subject<MessageEvent> {
    this.socket = io(url);

    // define observable which observes incoming messages from socket.io server
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('received a message from websocket server');
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

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
