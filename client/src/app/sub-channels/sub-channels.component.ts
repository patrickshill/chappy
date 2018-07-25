import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sub-channels',
  templateUrl: './sub-channels.component.html',
  styleUrls: ['./sub-channels.component.css']
})
export class SubChannelsComponent implements OnInit {

  constructor(private _httpService: HttpService) {
    this._httpService.subComponent = this;
  }

  subchannels: Object[];
  textchannels: Object[];
  voicechannels: Object[];

  ngOnInit() {
    this.getSubChannels();
  }

  getSubChannels(){
    this.subchannels = [];
    this.textchannels = [];
    this.voicechannels = [];
    let channel = this._httpService.getOneChannel(this._httpService.channel_id);
    channel.subscribe(data => {
      if("errors" in data){
        console.log("errors");
      }
      else {
        // console.log(data);
        for (var x of data["textChannels"]){
          this.textchannels.push(x);
        }
        for (var i of data["voiceChannels"]){
          this.voicechannels.push(i);
        }
      }
      for (let j of this.textchannels){
        let sub = this._httpService.getOneText(j);
        sub.subscribe(data => {
          this.subchannels.push(data);
        })
      }
      // for (let j of this.textchannels){
      //   let sub = this._httpService.getOneVoice(j);
      //   sub.subscribe(data => {
      //     this.subchannels.push(data);
      //   })
      // }
      console.log(this.subchannels);
    });
  };

  // Pass Sub ID to Service for biz
  passSub(id){
    this._httpService.subChat(id);
  }

}
