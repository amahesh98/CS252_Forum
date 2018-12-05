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
  showBar:boolean;
  str_showBar:string;
  showDropdown:boolean
  category:string
  userID:string;
  constructor(private _httpService:HttpService,private _router: Router) {
    this.user_name = localStorage.getItem('OF_UI_UN');
    this.str_showBar = localStorage.getItem('OF_LOG_I');
    this.showDropdown=false
    this.category=''
    this.userID = localStorage.getItem('OF_UID');
  }

  ngOnInit() {
    this.checkLoggedIn();
    if(localStorage.getItem('category')!=null){
      this.category=localStorage.getItem('category')
    }
    else{
      this.changeCategory('General')
    }
  }

  checkLoggedIn(){
    if(this.str_showBar == 'false'){
      this.showBar = false;
    }else{
      this.showBar = true;
    }
  }

  logout(){
    localStorage.setItem('OF_LOG_I','false');
    localStorage.removeItem('OF_UI_UN');
    localStorage.removeItem('OF_UID');
    location.reload(true);
    this._router.navigate(['']);
  }
  dropdownClicked(){
    console.log("Calling this function")
    this.showDropdown=!this.showDropdown
  }
  changeCategory(newCat){
    localStorage.setItem('category', newCat)
    this.category=newCat
    this.showDropdown=false
    location.reload(true);
  }
}
