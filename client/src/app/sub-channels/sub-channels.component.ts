import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sub-channels',
  templateUrl: './sub-channels.component.html',
  styleUrls: ['./sub-channels.component.css']
})
export class SubChannelsComponent implements OnInit {

  constructor(private _httpService: HttpService) {}

  subchannels: Object[];

  ngOnInit() {
    this.getSubChannels();
  }

  getSubChannels(){
    this.subchannels = [];

    let channel = this._httpService.getOneChannel(this._httpService.channel_id);
    channel.subscribe(data => {
      if("errors" in data){
        console.log("errors");
      }
      else {
        for (var x of data["textChannels"]){
          this.subchannels.push(x);
        }
        for (var i of data["voiceChannels"]){
          this.subchannels.push(i);
        }
      }
      // console.log(this.subchannels);
    });
  };

  // Pass Sub ID to Service for biz
  passSub(id){
    this._httpService.sub_id = id;
    // console.log(this._httpService.sub_id);
  }

}
