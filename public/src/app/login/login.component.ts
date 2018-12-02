import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  showErr_email:boolean;
  password:any;
  showErr_password:boolean;
  constructor(private _httpService:HttpService,private _router: Router) {
    this.email = "";
    this.showErr_email = false;
    this.showErr_password = false;
    this.password = "";
  }

  ngOnInit() {
  }

  submitLogin(){
    //validate email 
    if(this.email.match(/^\S+@\S+\.\S/) == null){
      this.showErr_email = true;
    }else{
      this.showErr_email = false;
    }

    //validate password
    if(this.password.length < 8){
      this.showErr_password = true;
    }else{
      this.showErr_password = false;
    }

    if(!this.showErr_email && !this.showErr_password){
      var loginObs=this._httpService.UserLogin(this.email,this.password);
      loginObs.subscribe(data=>{
        console.log("login ",data);
        if(data['success'] == 200){
          localStorage.setItem('OF_LOG_I','true');
          localStorage.setItem('OF_UI_UN',data['user']['user_name']);
          localStorage.setItem('OF_UID',data['user']['_id']);
          location.reload(true);
          this._router.navigate(['']);
        }else if(data['success']==401){
          this.showErr_email = true;
          this.showErr_password = true;
        }else if(data['success']==500){
          this.showErr_password = true;
          this.showErr_email = true;
        }
      })
    }
  }

}
