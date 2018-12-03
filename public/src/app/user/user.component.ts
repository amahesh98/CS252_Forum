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
  profile_picture:string;
  showChangePic:boolean;
  middlePicture:string;
  newPicture:string;
  currentUID:string;

  constructor(private _httpService:HttpService,private _router: Router,private _activatedRoute:ActivatedRoute) {
    this.userInfo = [];
    this.userID = "";
    this.middlePicture = "";
    this.currentUID = localStorage.getItem('OF_UID');
    this.questions = [];
    this.numOfQuestions = 0;
    this.first_name = "";
    this.last_name = "";
    this.profile_picture = "";
    this.showChangePic = false;
    var default_picture = "data:image/jpeg;base64,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";
    this.newPicture = "";
    this.middlePicture = default_picture;
    
   }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params=>{
      this.userID=params['uid']
      this.fetchUser();
    })
    
  }

  cancel(){
    this.showChangePic = false;
  }

  upping(){
    this.middlePicture = this.newPicture;
  }

  confirmChange(){
    
    if(this.newPicture != ""){
      console.log("change pic ",this.newPicture);
      var picObs = this._httpService.updateProfilePicture(this.currentUID,this.newPicture);
      picObs.subscribe(data=>{
        console.log("update pic ",data);
        if(data['success'] == 200){
          console.log("worked");
          this.profile_picture = this.newPicture;
          this.showChangePic = false;
          this.newPicture = "";
        }
      })
    }
  }

  changePicture(){
    if(this.userID == this.currentUID){
      console.log("change picture")
      this.middlePicture = this.profile_picture;
      this.showChangePic = true;
    }
    
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
        this.profile_picture = data['user']['profile_picture'];
        if(this.profile_picture == null){
          var default_picture = "data:image/jpeg;base64,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";
          this.profile_picture = default_picture;
        }
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
