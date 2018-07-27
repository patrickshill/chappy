import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup} from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {
  
  currentUser = this.localStorage.retrieve('user')
  user: any;
  show: Boolean;
  DMshow: Boolean;
  chatShow: Boolean;
  errors: any;
  allFriends: Object[];
  chatFriend: any;
  privateChat: any;
  constructor(private _httpService: HttpService, private localStorage: LocalStorageService) {}

  ngOnInit() {
    this.user = {
      name: ''
    }
    this.updateCurrentUser();
    this.getFriends();

  }


  findUsers(){
    let users = this._httpService.getUserByName(this.user);
    users.subscribe(data => {
      if (data == null) {
        this.errors = 'This user does not exist.'
        console.log(this.errors);
      }
      else if (data['username'] == this.currentUser.username){
        this.errors = 'You cannot add yourself!'
        console.log(this.errors)
      }
      else {
        if(this.currentUser.friendsList.length > 1){
          for (let x of this.currentUser.friendsList){
            if (data['_id'] == x){
              this.errors = 'You the same friend twice!'
              console.log(this.errors);
              return this.errors;
            }
            else {
              continue;
            }
          }
        }
        else {
          console.log('stuff');
          this.errors = null;
          let new_friend = {
            id: this.currentUser.id,
            F_id: data['_id'],
            channelName: "Friend Chat"
          };
          let friend = this._httpService.updateUser(new_friend);
          friend.subscribe(data => {
            console.log(data);
            this.updateCurrentUser();
          });
        }
      };
    }
  )};
  
  updateCurrentUser(){
    let update = this._httpService.getOneUser(this.currentUser.id);
    update.subscribe(data => {
      this.currentUser =  {
        id: data["_id"],
        username: data["username"],
        email: data["email"],
        avatar: data["avatar"],
        status: data["status"],
        channels: data["channels"],
        dm_channels: data["dm_channels"],
        friendsList: data["friendsList"]
      };
    });
  }

  getFriends(){
    this.allFriends = [];
    if (this.currentUser.friendsList.length > 0){
      for (var x of this.currentUser.friendsList){
        let friends = this._httpService.getOneUser(x);
        friends.subscribe(data => {
          this.allFriends.push({
            id: data['_id'],
            username: data["username"],
            email: data["email"],
            avatar: data["avatar"],
            status: data["status"],
          });
        });
      }
      console.log(this.allFriends);
    }
    else {
      console.log('you have no friends');
    }
  }

  //Show Add Friend Modal
  showModal() {
    this.show = true;
  }

  //Hide Add Friend Modal
  hideModal() {
    this.show= false;
  }

  //Show DM Modal
  showDMs() {
    this.DMshow = true;
  }

  //Hide DM Modal
  hideDMs() {
    this.DMshow= false;
  }

  //Show Specific Friend's Chat Modal
  showChat(id) {
    this.chatShow = true;
    // this.chatFriend;
    let chat = this._httpService.getOneUser(id);
    chat.subscribe(data => {
      console.log(data);
      this.chatFriend = {
        id: data['_id'],
        username: data["username"],
        dm_channels: data["dm_channels"]
      }
    })
    for(var x of this.chatFriend.dm_channels){

      for(var j of this.currentUser.dm_channels){
        if (x == j){
          console.log(x, j);
          return this.privateChat = j;
        }
        else {
          console.log('You have no private chat :(');
        }
      }

    }
  }
  
  //Hide Friend's Chat Modal
  hideChat() {
    this.chatShow = false;
  }

  

}