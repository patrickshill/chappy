import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LocalStorageService } from '../../../node_modules/ngx-webstorage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Retrieving user information from local storage for current name display
  user = this.localStorage.retrieve('user')

  constructor(private _httpService: HttpService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.user;
  }

}
