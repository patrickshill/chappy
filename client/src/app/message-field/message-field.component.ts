import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ChatService } from '../chat.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-message-field',
  templateUrl: './message-field.component.html',
  styleUrls: ['./message-field.component.css']
})
export class MessageFieldComponent implements OnInit {

  message: FormGroup;
  id = this._httpService.user.id;
  errors: any;
  message_list: any;
  userName = this._httpService.user.username;
  userAvatar = this._httpService.user.avatar;

  constructor(private _httpService: HttpService, private fb: FormBuilder, private chat: ChatService)
  {
    this._httpService.msgField = this;
    chat.messages.subscribe(msg => {
      console.log('response from websocket server')
    })
  }

  private random_message = {
    author: 'elliot',
    message: 'howdy howdy howdy'
  }

  ngOnInit() {
    console.log("please help me");
    this.message = this.fb.group({
      U_id: this.id,
      content: '',
      T_id: this._httpService.sub_id,
      userName: this.userName,
      userAvatar: this.userAvatar
    });

    this.chat.messages.subscribe(msg => {
      this.message = msg;
      console.log(this.message);
    })

  }

  // sendMsg(){
    // this.chat.sendMsg("testmsg");
  // }

  sendMessage(post){
    let messages = this._httpService.updateTextChannel(post);
    messages.subscribe(data => {
      if('errors' in data){
        console.log(data);
        this.errors = data;
      }
      else {
        this._httpService.getMessages();
        
        this.message = this.fb.group({
          U_id: this.id,
          content: '',
          T_id: this._httpService.sub_id,
          userName: this.userName,
          userAvatar: this.userAvatar
        });
      }
    })
    this.chat.sendMsg("testmsg");
  }

}
