import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  channel_id: any;
  sub_id: any;

  subComponent: any;
  bizComponent: any;
  msgField: any;
  chapp: any;

  constructor(private _http: HttpClient, private localStorage: LocalStorageService) {}

  createUser(data){
    return this._http.post("/api/users", data);
  }

  getAllUsers(){
    return this._http.get("/api/users");
  }

  getOneUser(id){
    return this._http.get("/api/users/"+id);
  }

  updateUser(data){
    return this._http.post("/api/users/addTo", data);
  }

  removeFromUser(data){
    return this._http.post("/api/users/removeFrom", data);
  }

  removeUser(id){
    return this._http.delete("/api/users/"+id);
  }

  // Channel routes

  createChannel(data){
    return this._http.post("/api/channels/new", data);
  }

  getAllChannels(){
    return this._http.get("/api/channels");
  }

  getOneChannel(id){
    return this._http.get("/api/channels/"+id);
  }

  addToChannel(data){
    return this._http.post("/api/channels/update", data);
  }

  removeFromChannel(id, data){
    return this._http.patch("/api/channels/remove/"+id, data)
  }

  removeChannel(id){
    return this._http.delete("/api/channels/delete/"+id);
  }

  // Text Sub Channel Routes

  createTextChannel(data){
    return this._http.post("/api/textchannels/new", data);
  }

  getAllText(){
    return this._http.get("/api/textchannels");
  }

  getOneText(id){
    return this._http.get("/api/textchannels/"+id);
  }

  updateTextChannel(data){
    return this._http.post("/api/textchannels/update", data);
  }

  // User registration
  userRegistration(regForm) {
    return this._http.post("/api/users",regForm);
  }
  
  // User login
  userLogin(loginForm) {
    return this._http.post("/api/users/login", loginForm);
  }


  showSub(id){
    this.channel_id = id;
    this.subComponent.ngOnInit();
  };


  subChat(id){
    this.sub_id = id;
    this.bizComponent.ngOnInit();
    this.msgField.ngOnInit();
    this.chapp.showSub();
    this.chapp.ngOnInit();
  };

  getMessages(){
    this.bizComponent.ngOnInit();
  }

}
