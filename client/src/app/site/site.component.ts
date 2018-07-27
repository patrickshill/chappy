import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import anime from 'animejs';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit, AfterViewInit {
  regForm: any;
  loginForm: any;
  regErrors: any;
  loginErrors: any;
  showRegistration = false;
  showLogin = false;
  popCat: any;
  getStartedHover: any;
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
  
  ngAfterViewInit() {
    this.popCat = anime({
      targets: '#chappy-cat',
      translateY: [
        { value: -200, duration: 0 },
        { value: 100, duration: 4000},
        { value: 0, duration: 1000}
      ],
      duration: 10000
    })
  }

  animateCat() {
    this.popCat.play();
  }

  mouseEnterGetStarted() {
    this.getStartedHover = anime({
      targets: '#get-started',
      scale: 1.1,
      duration: 1000
    })
  }
  mouseLeaveGetStarted() {
    anime.remove(this);
    this.getStartedHover = anime({
      targets: '#get-started',
      scale: 1,
      duration: 1000
    })
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
