import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-the-biz',
  templateUrl: './the-biz.component.html',
  styleUrls: ['./the-biz.component.css']
})
export class TheBizComponent implements OnInit, AfterViewInit {

  messages: any;

  constructor(private _httpService: HttpService, private wsService: WebsocketService) {
    this._httpService.bizComponent = this;
    this.wsService.bizComponent = this;
  }

  ngOnInit() {
    this.messages = [];
    this.getMessages(); 
  }

  // After view loads, set the scroll height to move the message list to the very bottom
  // to allow for a better UX while viewing and sending messages.
  ngAfterViewInit(){
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  // Get Messages from sub channel and move chat log to the bottom. 
  // setTimeout function seemed to be necessary for async lifecycle.
  getMessages(){
    let sub = this._httpService.getOneText(this._httpService.sub_id);
    sub.subscribe(data => {
        this.messages = data["messages"];
        setTimeout(function(){ 
          let chatlog = document.getElementById("chat-content");
          chatlog.scrollTop = chatlog.scrollHeight;
        },1);
        let chatlog = document.getElementById("chat-content");
        chatlog.scrollTop = chatlog.scrollHeight;
    })
  }

  //#### I see a lot of redundancy. Refactor this component and test####
  scrollDownChat() {
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  
}
