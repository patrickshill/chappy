import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  logged = false;
  user_id = "";
  constructor(private _http: HttpClient) { }

  createUser(data){
    this._http.post("/api/users", data);
  }

  getAllUsers(){
    this._http.get("/api/users");
  }

  getOneUser(id){
    this._http.get("/api/users/"+id);
  }

  updateUser(id, data){
    this._http.post("/api/users/addTo/"+id, data);
  }

  removeFromUser(id, data){
    this._http.post("/api/users/removeFrom/"+id, data);
  }

  removeUser(id){
    this._http.delete("/api/users/"+id);
  }

  // Channel routes

  createChannel(id, data){
    this._http.post("/api/channels/new/"+id, data);
  }

  getAllChannels(){
    this._http.get("/api/channels");
  }

  getOneChannel(id){
    this._http.get("/api/channels/"+id);
  }

  addToChannel(id, data){
    this._http.patch("/api/channels/update/"+id, data);
  }

  removeFromChannel(id, data){
    this._http.patch("/api/channels/remove/"+id, data)
  }

  removeChannel(id){
    this._http.delete("/api/channels/delete/"+id);
  }

  // Text Sub Channel Routes

  createTextChannel(data){
    this._http.post("/api/textchannels/new", data);
  }

  getAllText(){
    this._http.get("/api/textchannels");
  }

  getOneText(id){
    this._http.get("/api/textchannels/"+id);
  }

  updateTextChannel(id, data){
    this._http.post("/api/textchannels/update/"+id, data);
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
}
