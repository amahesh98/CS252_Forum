import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) {

  }

  RegisterUser(user_name,first_name,last_name,email,password){
    return this._http.post('/processRegister',{user_name:user_name,first_name:first_name,last_name:last_name,email:email,password:password});
  }

  UserLogin(email,password){
    return this._http.post('/processLogin',{email:email,password:password});
  }
  askQuestion(subject, question, category, userID){
    return this._http.post('/askQuestion', {title:subject, desc:question, userID:userID, category:category})
  }
  fetchSingleQuestion(questionID){
    return this._http.post('/fetchSingleQuestion', {questionID:questionID})
  }

}
