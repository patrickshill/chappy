import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SubChannelsComponent } from '../sub-channels/sub-channels.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  user = this._httpService.user;
  channel: any;
  abb_channel: Object[];
  new_id: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.updateUser();
    this.user = this._httpService.user;
  }

  // Adding channel group and running service method to update user info
  addChannel(){
    let genericData = {
      U_id: this._httpService.user.id,
      channelName: 'New Channel',
    }
    let new_channel = this._httpService.createChannel(genericData);
    new_channel.subscribe(data => {
      console.log(data);
      this.new_id = data["_id"];
      this.ngOnInit();
    });
    
  }
  
  updateUser(){
    let obs = this._httpService.getOneUser(this._httpService.user.id);
    obs.subscribe(data=>{
      this._httpService.user = {
          id: data["_id"],
          username: data["username"],
          email: data["email"],
          avatar: data["avatar"],
          status: data["status"],
          channels: data["channels"],
          dm_channels: data["dm_channels"],
          friendsList: data["friendsList"]
        };
        this.AbbreviateChannels();
      })
  }

  // Make a list of abbreviated channel names for display
  AbbreviateChannels(){
    this.abb_channel = [];
    if (this._httpService.user.channels.length > 0){
      for (var x of this._httpService.user.channels){
        let channel = this._httpService.getOneChannel(x);
        channel.subscribe(data => {
          data["channelName"] = data["channelName"].match(/\b\w/g).join('');
          this.abb_channel.push(data);
        });
      }
    }
    return this.abb_channel;
  }

  // Set id in sub channel component
  getChannelId(id){
    this._httpService.showSub(id);
  }

  getMain(){
    this._httpService.showSub("5b5a13f1da275949507f8596");
  }


}
