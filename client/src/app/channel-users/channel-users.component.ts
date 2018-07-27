import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {

  allUsers: FormGroup;
  show: Boolean;
  users: any;
  constructor(private _httpService: HttpService, private fb: FormBuilder) {
    
    this.allUsers = fb.group({
        name: '',
        id: ''
    })
    
  }

  ngOnInit() {
    this.findUsers();
  }


  findUsers(){
    let users = this._httpService.getAllUsers();
    users.subscribe(data => {
      this.users = data;
    });
  }

  showModal() {
    this.show = true;
  }

  hideModal() {
    this.show= false;
  }

}
