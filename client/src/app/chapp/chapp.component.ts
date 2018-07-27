import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chapp',
  templateUrl: './chapp.component.html',
  styleUrls: ['./chapp.component.css']
})
export class ChappComponent implements OnInit {


  subChannel: any;

  constructor(private _httpService: HttpService) {
    this._httpService.chapp = this;
  }

  ngOnInit() {
    this.scrollChatDown();
  }

  showSub(){
    let sub = this._httpService.getOneText(this._httpService.sub_id);
    sub.subscribe(data => {
      this.subChannel = data['channelName'];
    })
  }

  scrollChatDown() {
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

}
