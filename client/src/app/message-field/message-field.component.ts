import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ChatService } from '../chat.service';

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

  constructor(private _httpService: HttpService, private fb: FormBuilder, private chatService: ChatService)
  {
    this._httpService.msgField = this;
    chatService.messages.subscribe(msg => {
      console.log('response from websocket server')
    })
  }

  private random_message = {
    author: 'elliot',
    message: 'howdy howdy howdy'
  }
  sendMsg(){
    console.log('msg from client');
    this.chatService.messages.next(this.random_message);
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
  }

  sendMessage(post){
    let messages = this._httpService.updateTextChannel(post);
    messages.subscribe(data => {
      if('errors' in data){
        console.log(data);
        this.errors = data;
      }
      else {
        this._httpService.getMessages();
      }
    })
  }

}
