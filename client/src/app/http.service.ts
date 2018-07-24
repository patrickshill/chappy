import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  logged = false;
  user_id = "";
  constructor(private _http: HttpClient) { }

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
