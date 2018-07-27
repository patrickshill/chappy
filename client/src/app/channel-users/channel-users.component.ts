import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup} from '@angular/forms';
import { log } from 'util';
import { log } from 'util';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit, AfterViewInit {
  
  currentUser = this.localStorage.retrieve('user')
  user: any;
  show: Boolean;
  errors: any;
  allFriends: Object[];
  constructor(private _httpService: HttpService, private localStorage: LocalStorageService) {}

  ngOnInit() {
    this.user = {
      name: ''
    }
    this.updateCurrentUser();
  }

  ngAfterViewInit(){
    this.getFriends();
  }


  findUsers(){
    let users = this._httpService.getUserByName(this.user);
    users.subscribe(data => {
      if (data == null) {
        this.errors = 'This user does not exist.';
        console.log(this.errors);
      }
      else if (data['username'] == this.currentUser.username){
        this.errors = 'You cannot add yourself!'
        console.log(this.errors);
      }
      else {
        for (let x of this.currentUser.friendsList){
          if (data['_id'] == x){
            this.errors = 'You the same friend twice!'
            console.log(this.errors);
            return this;
          }
        }
        this.errors = null;
        let new_friend = {
          id: this.currentUser.id
          F_id: data['_id']
        }
        let friend = this._httpService.updateUser(new_friend);
        friend.subscribe(data => {
          console.log(data);
          this.updateCurrentUser()
        })
      }
    });
  }

  updateCurrentUser(){
    let update = this._httpService.getOneUser();
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
        this.localStorage.store('user', currentUser);
        this.getFriends();
      });
    });

  
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

  showModal() {
    this.show = true;
  }

  hideModal() {
    this.show= false;
  }

}