import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo:any;
  userID:any;
  user_name:string;
  first_name:string;
  last_name:string;
  createdAt:any;
  numOfQuestions:number;
  questions:any;

  constructor(private _httpService:HttpService,private _router: Router,private _activatedRoute:ActivatedRoute) {
    this.userInfo = [];
    this.userID = "";
    this.questions = [];
    this.numOfQuestions = 0;
    this.first_name = "";
    this.last_name = "";
    
   }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params=>{
      this.userID=params['uid']
      this.fetchUser();
    })
    
  }

  fetchUser(){
    var userObs = this._httpService.fetchUser(this.userID);
    userObs.subscribe(data=>{
      console.log(data);
      if(data['success']==1){
        //succ
        this.user_name = data['user']['user_name'];
        this.first_name = data['user']['first_name'];
        this.last_name = data['user']['last_name'];
        this.createdAt = data['user']['createdAt'];
        console.log("user ",this.user_name," ",this.first_name," ",this.last_name," ",this.createdAt);
        var questionsObs = this._httpService.fetchUserQuesitons(this.userID);
        questionsObs.subscribe(qdata=>{
          console.log(qdata);
          if(qdata['success']==1){
            //succ
            this.questions = qdata['questions'];
            if(this.questions.length == 0){
              this.numOfQuestions = 0;
            }else{
              this.numOfQuestions = this.questions.length;
            }
          }else{
            //fail
            this.numOfQuestions = 0;
          }
        })
      }else{
        //fail
      }
    })
  }
  


}
