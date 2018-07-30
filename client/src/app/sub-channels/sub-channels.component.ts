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
  channelName: String;
  subchannels: Object[];
  textchannels: Object[];
  voicechannels: Object[];
  newSub: any;
  showCreate: Boolean;

  ngOnInit() {
    this.newSub = {
      id: this._httpService.channel_id,
      textChannel: ''
    }
    this.getSubChannels();
  }

  //Get subchannels from the main channel provided
  //###Refactor code to get rid of for loop and test###
  getSubChannels(){
    this.subchannels = [];
    this.textchannels = [];
    let channel = this._httpService.getOneChannel(this._httpService.channel_id);
    channel.subscribe(data => {
      if("errors" in data){
        console.log("errors");
      }
      else {
        this.channelName = data["channelName"];
        this.textchannels = data["textChannels"];
        for (let j in this.textchannels){
          let sub = this._httpService.getOneText(this.textchannels[j]);
          sub.subscribe(data => {
            this.subchannels.push(data);
          })
        }
      }
    });
  };

  // Pass Sub ID to Service for biz
  passSub(id){
    this._httpService.subChat(id);
  }

  // Add sub channel to main channel group
  addSubChannel(){
    let new_channel = this._httpService.addToChannel(this.newSub);
    new_channel.subscribe(data => {
      this.getSubChannels();
    })
    this.hideCreateModal();
    this.newSub = {
      id: this._httpService.channel_id,
      textChannel: ''
    }
  }

  //show modal
  showCreateModal() {
    this.showCreate = true;
  }
  //hide modal
  hideCreateModal() {
    this.showCreate = false;
  }

}
