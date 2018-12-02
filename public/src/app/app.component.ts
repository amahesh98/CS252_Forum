import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  show_login:boolean;
  show_page:boolean;
  constructor(private _httpService: HttpService,private _router: Router){
    this.show_login = false;
    this.show_page = false;
  }

  ngOnInit(){
    // this.logic();
    this.show_page=true;
  }

  logic(){
    if(localStorage.getItem('loggedIntoAccount') == 'true'){
      this.show_page = true;
    }else{
      this.show_login = true;
      this._router.navigate(['/login']);
    }
  }
}
