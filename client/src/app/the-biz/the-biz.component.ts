import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-the-biz',
  templateUrl: './the-biz.component.html',
  styleUrls: ['./the-biz.component.css']
})
export class TheBizComponent implements OnInit {

  messages: any;

  constructor(private _httpService: HttpService) {
    this._httpService.bizComponent = this;
  }

  ngOnInit() {
    this.messages = [];
    this.getMessages();
  }

  getMessages(){
    let sub = this._httpService.getOneText(this._httpService.sub_id);
    sub.subscribe(data => {
        this.messages = data["messages"];
        console.log(this.messages, "im the real biz");
    })
  }

  
}
