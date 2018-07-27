import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import anime from 'animejs';

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
  popCat: any;
  catAnimation: any;
  catIntroCompleted: Boolean;
  getStartedHover: any;
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

    //Animation
    this.catIntroCompleted = false;
    console.log("reset to false...>");
  }
  
  ngAfterViewInit() {
    this.popCat = anime({
      targets: '#chappy-cat',
      translateY: [
        { value: 100, duration: 4000},
        { value: 0, duration: 1000}
      ],
      duration: 10000,
      complete: this.setIntroComplete()
    })
  }
  
  setIntroComplete(){
    this.catIntroCompleted = true;
    console.log("animation completed",this.catIntroCompleted);
  }

  animateCat() {
    this.popCat.play();
  }

  petCat() {
    if(this.catIntroCompleted == true) {
      let cat = document.getElementById("chappy-cat");
      anime.remove(cat);
      anime({
        targets: '#chappy-cat',
        translateY: [
          { value: 20, duration: 250 },
          { value: 15, duration: 500 }
        ],
        duration: 1000
      })
    }
  }
  
  mouseEnterCat(){
    if(this.catIntroCompleted == true) {
      let cat = document.getElementById("chappy-cat");
      anime.remove(cat);
      this.catAnimation = anime({
        targets: '#chappy-cat',
        translateY: 15,
        duration: 750
      })
    }
  }

  mouseLeaveCat(){
    if(this.catIntroCompleted == true) {
      let cat = document.getElementById("chappy-cat");
      anime.remove(cat);
      this.catAnimation = anime({
        targets: '#chappy-cat',
        translateY: 0,
        duration: 1000
      })
    }
  }

  //Button animations
  mouseEnterGetStarted() {
    let btn = document.getElementById("get-started");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#get-started',
      scale: 1.1,
      duration: 1000
    })
  }
  mouseLeaveGetStarted() {
    let btn = document.getElementById("get-started");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#get-started',
      scale: 1,
      duration: 1000
    })
  }

  openMouseEnter(){
    let btn = document.getElementById("open-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#open-btn',
      scale: 1.1,
      duration: 500
    })
  }
  openMouseLeave(){
    let btn = document.getElementById("open-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#open-btn',
      scale: 1,
      duration: 500
    })
  }
  loginMouseEnter(){
    let btn = document.getElementById("login-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#login-btn',
      scale: 1.1,
      duration: 500
    })
  }
  loginMouseLeave(){
    let btn = document.getElementById("login-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#login-btn',
      scale: 1,
      duration: 500
    })
  }
  regMouseEnter(){
    let btn = document.getElementById("register-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#register-btn',
      scale: 1.1,
      duration: 500
    })
  }
  regMouseLeave(){
    let btn = document.getElementById("register-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#register-btn',
      scale: 1,
      duration: 500
    })
  }
  logoutMouseEnter(){
    let btn = document.getElementById("logout-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#logout-btn',
      scale: 1.1,
      duration: 500
    })
  }
  logoutMouseLeave(){
    let btn = document.getElementById("logout-btn");
    anime.remove(btn);
    this.getStartedHover = anime({
      targets: '#logout-btn',
      scale: 1,
      duration: 500
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
    this.showRegistration = true;
  }
  hideRegistrationModal() {
    this.showRegistration = false;
  }

  // Show/hide login modal
  showLoginModal() {
    this.showLogin = true;
  }
  hideLoginModal() {
    this.showLogin = false;
  }

}
