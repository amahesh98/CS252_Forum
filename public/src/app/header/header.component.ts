import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_name:string;
  constructor(private _httpService:HttpService,private _router: Router) {
    this.user_name = localStorage.getItem('OF_UI_UN');
  }

  ngOnInit() {
  
  }


  logout(){
    localStorage.setItem('OF_LOG_I','false');
    localStorage.removeItem('OF_UI_UN');
    localStorage.removeItem('OF_UID');
    location.reload(true);
    this._router.navigate(['']);

  }
}
