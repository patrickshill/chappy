import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user = this._httpService.user

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.user;
  }

}
