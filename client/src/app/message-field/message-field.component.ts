import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

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

  constructor(private _httpService: HttpService,
    private fb: FormBuilder, 
    private _route: ActivatedRoute, 
    private _router: Router)
    {
      this._httpService.msgField = this;
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
    // this.getMessages();
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

  // getMessages(){
  //   let messages = this._httpService.getOneText(this.channel_id);
  //   messages.subscribe(data => {
  //     this.message_list = data["messages"];
  //   });
  // }

}
