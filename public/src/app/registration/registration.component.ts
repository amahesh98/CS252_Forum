import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpService }  from '../http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user_name:string;
  showErr_username:boolean;
  first_name:string;
  showErr_firstname:boolean;
  last_name:string;
  showErr_lastname:boolean;
  email:string;
  showErr_email:boolean;
  password:any;
  showErr_password:boolean;
  password_second:any;
  showErr_passwsec:boolean;
  show_succ:boolean;
  show_fail:boolean;
  status_message:string;
  constructor(private _router: Router,  private _httpService:HttpService) {
    this.showErr_email = false;
    this.showErr_password = false;
    this.showErr_firstname = false;
    this.showErr_lastname = false;
    this.showErr_passwsec = false;
    this.showErr_username = false;
    this.show_succ = false;
    this.user_name = "";
    this.first_name = "";
    this.last_name = "";
    this.password = "";
    this.email = "";
    this.password_second = "";
   }

  ngOnInit() {

  }

  submitRegister(){
    console.log("IN");
    //validate the username is 3 characters
    if(this.user_name.length < 3){
      this.showErr_username = true;
    }else{
      this.showErr_username = false;
    }

    //validate the name isnt empty
    if(this.first_name.match(/^[A-Za-z']+$/) == null || this.first_name.length < 2 ){
      this.showErr_firstname = true;
    }else{
      this.showErr_firstname = false;
    }


    //validate the last name isnt empty
    if(this.last_name.match(/^[A-Za-z']+$/) == null || this.last_name.length < 2){
      this.showErr_lastname = true;
    }else{
      this.showErr_lastname = false;
    }

    //validate the email
    if(this.email.match(/^\S+@\S+\.\S/) == null){
      this.showErr_email = true;
    }else{
      this.showErr_email = false;
    }

    //validate the password
    if(this.password.length < 8){
      this.showErr_password = true;
    }else{
      this.showErr_password = false;
    }

    //validate the passwords match
    if(this.password != this.password_second || this.password_second.length == 0){
      this.showErr_passwsec = true;
    }else{
      this.showErr_passwsec = false;
    }

    if(!this.showErr_email && !this.showErr_firstname && !this.showErr_lastname && !this.showErr_password && !this.showErr_passwsec && !this.showErr_username){
      var registerObs=this._httpService.RegisterUser(this.user_name,this.first_name,this.last_name,this.email,this.password);
      registerObs.subscribe(data=>{
        this.show_fail = false;
        this.show_succ = false;
        console.log(data);
        if(data['success'] == 201){
          //success
          this.show_succ = true;
        }else if(data['success'] == 500){
          //server error
          this.status_message = data['message'];
          this.show_fail = true;
        }else if(data['success'] == 400){
          //client error
          this.status_message = data['message'];
          this.show_fail = true;
        }
      })
    }

  }

}
