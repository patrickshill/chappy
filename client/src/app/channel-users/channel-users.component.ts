import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { ChatService } from '../chat.service';
import { WebsocketService } from '../websocket.service';

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
  messages: any;
  MESSAGECHAT: any;
  form_message: FormGroup;

  constructor(private _httpService: HttpService, private fb: FormBuilder, private localStorage: LocalStorageService, private chat: ChatService, private wsService: WebsocketService) {
    this.wsService.channelusers = this;
    this.chat.messages.subscribe(msg => {
      // console.log('response from websocket server')
    })
  }

  ngOnInit() {
    this.user = {
      name: ''
    }
    this.form_message = this.fb.group({
      U_id: this.currentUser.id,
      content: '',
      T_id: this.privateChat,
      userName: this.currentUser.username,
      userAvatar: this.currentUser.avatar
    });

    this.updateCurrentUser();
    // this.getFriends();
    this.chatFriend = {
      id: '',
      username: '',
      dm_channels: ''
    }
    this.messages = [];
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
          for (let x of this.currentUser.friendsList){
            if (data['_id'] == x){
              this.errors = 'You added the same friend twice!'
              console.log(this.errors);
              return this.errors;
            }
          }
          console.log('wowwowoowowowowoowowowowowoowowoww')
          this.errors = null;
          let new_friend = {
            id: this.currentUser.id,
            F_id: data['_id'],
            channelName: "Friend Chat"
          };
          let friend = this._httpService.updateUser(new_friend);
          friend.subscribe(data => {
            this.updateCurrentUser();
            this.user.name = '';
            this.hideModal();
          });
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
      console.log(data);
      this.getFriends();
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

  //Show Specific Friend's Chat Modal and get keep specific info.
  showChat(id) {
    this.chatShow = true;
    let findChat = this._httpService.getOneUser(id);
    findChat.subscribe(data => {
      this.chatFriend = {
        id: data['_id'],
        username: data["username"],
        dm_channels: data["dm_channels"]
      }
      for(var x of this.chatFriend.dm_channels){
        for(var j of this.currentUser.dm_channels){
          if (x == j){
            //SAVE CHAT ID IN VARIABLE FOR LATER USE
            this.findChat(j);
            return this.privateChat;
          }
          else {
            console.log('You have no private chat :(');
          }
        }
      }
    })

  }

  // query db for chat specific to user you click on.
  findChat(private_chat_id){
    let mainChat = this._httpService.getOneChannel(private_chat_id);
    mainChat.subscribe(data => {
      let actualChat = this._httpService.getOneText(data["textChannels"])
      actualChat.subscribe(textChat => {
        this.messages = textChat["messages"];
        this.privateChat = textChat["_id"];
        this.form_message['T_id'] = textChat["_id"];
      });
    })
  }
  
  //Hide Friend's Chat Modal
  hideChat() {
    this.chatShow = false;
  }

  sendPvtMsg(post){
    post.T_id = this.privateChat;
    let msg = this._httpService.updateTextChannel(post);
    msg.subscribe(data => {
      if('errors' in data){
        console.log(data)
      }
      else {
        //make get() message function here
        let actualChat = this._httpService.getOneText(data['_id'])
        actualChat.subscribe(textChat => {
          this.messages = textChat["messages"];
        });

        //reset form data
        this.form_message = this.fb.group({
          U_id: this.currentUser.id,
          content: '',
          T_id: this.privateChat,
          userName: this.currentUser.username,
          userAvatar: this.currentUser.avatar
        });
        // grab the text ID for rerender
        this.MESSAGECHAT = data['_id'];
        //socket function
        this.chat.sendMsg("testmsg")
      }
    })
  }

  reloadModal(){
    let actualChat = this._httpService.getOneText(this.MESSAGECHAT)
      actualChat.subscribe(textChat => {
        this.messages = textChat["messages"];
      });
  }
}