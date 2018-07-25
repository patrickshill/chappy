import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-the-biz',
  templateUrl: './the-biz.component.html',
  styleUrls: ['./the-biz.component.css']
})
export class TheBizComponent implements OnInit {

  messages: Object[];

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages(){
    let sub = this._httpService.getOneText(this._httpService.sub_id);
    sub.subscribe(data => {
      if (data["messages"].length >= 1){
        for(let messages of data["messages"]){
          messages.push(messages);
        }
      }
      else {
        console.log(data, "im the biz!")
      }
    })
  }

  
}
