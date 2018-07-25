import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubChannelsComponent } from './sub-channels/sub-channels.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  logged = false;
  user = {
    id: '',
    username: '',
    email: '',
    avatar: '',
    status: '',
    channels: [],
    dm_channels: [],
    friendsList: []
  };

  channel_id: any;
  sub_id: any;

  constructor(private _http: HttpClient) {}

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

  addToChannel(id, data){
    return this._http.patch("/api/channels/update/"+id, data);
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

  updateTextChannel(id, data){
    return this._http.post("/api/textchannels/update/"+id, data);
  }

  // User registration
  userRegistration(regForm) {
    return this._http.post("/api/users",regForm);
  }
  
  // User login
  userLogin(loginForm) {
    console.log(loginForm);
    return this._http.post("/api/users/login", loginForm);
  }

  // Update current state of user
  showSub(id){
    this.channel_id = id;

    console.log(this.channel_id);
  };

}
