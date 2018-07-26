import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
  }

}
