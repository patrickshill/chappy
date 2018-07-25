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

  user: any;
  channel: any;
  abb_channel: Object[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    // this._httpService.currentUserUpdate();
    this.user = this._httpService.user;
    this.updateUser();
    this.AbbreviateChannels();
  }

  // Adding channel group and running service method to update user info
  addChannel(){
    let genericData = {
      U_id: this._httpService.user.id,
      channelName: 'New Channel',
    }
    let new_channel = this._httpService.createChannel(genericData);
    new_channel.subscribe(data => {
      console.log("New channel is",data)
      // this.ngOnInit();
      this.ngOnInit();
    });
    // this.ngOnInit();
    
  }
  
  updateUser(){
    let obs = this._httpService.getOneUser(this._httpService.user.id);
    obs.subscribe(data=>{
      this.user = this.user = {
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
      console.log("User has been updated",this.user);
    })
  }

  // Make a list of abbreviated channel names for display
  AbbreviateChannels(){
    this.abb_channel = [];
    for (var x of this._httpService.user.channels){
      // console.log(x);
      this.abb_channel.push(
        {
          name: x["channelName"].match(/\b\w/g).join(''),
          id: x._id
        }
      );
    }
    console.log(this.abb_channel);
    return this.abb_channel;
  }

  // Set id in sub channel component
  getChannelId(id){
    this._httpService.channel_id = id;
    console.log(id);
  }


}
