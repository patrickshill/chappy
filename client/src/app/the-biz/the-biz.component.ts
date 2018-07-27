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

  ngAfterViewInit() {
    
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  getMessages(){
    let sub = this._httpService.getOneText(this._httpService.sub_id);
    sub.subscribe(data => {
        this.messages = data["messages"];
        console.log(this.messages, "im the real biz");
        setTimeout(function(){ 
          let chatlog = document.getElementById("chat-content");
          chatlog.scrollTop = chatlog.scrollHeight;
        },1);
    })
  }

  scrollDownChat() {
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  
}
