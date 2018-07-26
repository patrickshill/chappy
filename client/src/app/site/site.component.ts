import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  regForm: any;
  loginForm: any;
  regErrors: any;
  loginErrors: any;
  showRegistration = false;
  showLogin = false;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
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
        this._httpService.user = {
          id: data["_id"],
          username: data["username"],
          email: data["email"],
          avatar: data["avatar"],
          status: data["status"],
          channels: data["channels"],
          dm_channels: data["dm_channels"],
          friendsList: data["friendsList"]
        }
        this._httpService.logged = true;
        console.log(this._httpService.user, this._httpService.logged)
        this.hideLoginModal();
        this.loginForm = {
          email: "",
          password:""
        }
      }
    })
  }

  logoutUser(){
    this._httpService.logged = false;
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
