import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  logged: any;
  regForm: any;
  loginForm: any;
  regErrors: any;
  loginErrors: any;
  showRegistration = false;
  showLogin = false;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.logged = this.localStorage.retrieve('logged');
    this.regErrors = [];
    this.loginErrors = [];
    this.regForm = {
      username: "",
      first_name: "",
      last_name: "",
      email:"",
      password:""
    }
    this.loginForm = {
      email: "",
      password:""
    }
  }
  

  // Register user
  userRegistration(){
    let obs = this._httpService.userRegistration(this.regForm);
    obs.subscribe(data=>{
      console.log(data);
      if("errors" in data) {
        console.log(data["errors"]);
      } else {
        console.log("User registered successfully");
        // this._router.navigate(['/chapp']);
        
        this.hideRegistrationModal();
        this.regForm = {
          username: "",
          first_name: "",
          last_name: "",
          email:"",
          password:""
        }
      }
    })
  }

  // Login user
  userLogin() {
    let obs = this._httpService.userLogin(this.loginForm)
    obs.subscribe(data=>{
      console.log(data);
      if("errors" in data){
        console.log("Errors in site.component.ts", data);
      } else {
        console.log("loggin in yo");
        //creating local storage for user id for login
        this.localStorage.store('user', {
          id: data["_id"],
          username: data["username"],
          email: data["email"],
          avatar: data["avatar"],
          status: data["status"],
          channels: data["channels"],
          dm_channels: data["dm_channels"],
          friendsList: data["friendsList"]
        });
        //creating local storage for loggin status
        this.localStorage.store('logged', true);
        this.logged = true;
        //retrieving local storage so i can see it...
        console.log(this.localStorage.retrieve('user'), "localstorage");
        console.log(this.localStorage.retrieve('logged'), "localstorage");
        // this._httpService.logged = true;

        this.hideLoginModal();
        this.loginForm = {
          email: "",
          password:""
        }
      }
    })
  }

  logoutUser(){
    this.localStorage.clear();
    this.localStorage.store('logged', false);
    this.logged = false;
  }
  
  // Show/hide registration modal
  showRegistrationModal() {
    console.log("Showing registration modal");
    this.showRegistration = true;
  }
  hideRegistrationModal() {
    this.showRegistration = false;
  }

  // Show/hide login modal
  showLoginModal() {
    console.log("Showing registration modal");
    this.showLogin = true;
  }
  hideLoginModal() {
    this.showLogin = false;
  }

}
