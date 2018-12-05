import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute }  from '@angular/router';
import { HttpService }  from '../http.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  questionCategory:string
  questionTitle:string;
  questionUser:any;
  questionText:string;
  showErr_title:boolean;
  showErr_question:boolean;
  showSuccess:boolean;
  showFailure:boolean;
  bigErr:string
  showBigErr:boolean
  constructor(private _Activatedroute: ActivatedRoute, private _router:Router, private _httpService:HttpService) {
    this.questionText = "";
    this.questionUser = "";
    this.showErr_question = false;
    this.questionTitle=""
    this.questionCategory=''
    this.showErr_title = false;
    this.showSuccess = false;
    this.showFailure = false;
    this.bigErr="There was an error while trying to post this question. Try again later"
    this.showBigErr=false;
  }

  ngOnInit() {
    this.questionCategory=localStorage.getItem("category")
    // this.questionCategory="Fake"
  }


  submitQuestion(){
    if(this.questionTitle.length < 5){
      this.showErr_title = true;
    }else{
      this.showErr_title = false;
    }

    if(this.questionText.length < 10){
      this.showErr_question = true;
    }else{
      this.showErr_question = false;
    }
    console.log("Question Error:", this.showErr_question, "Title Error:", this.showErr_title)

    if(!this.showErr_title && !this.showErr_question){
      // console.log("send post question request",this.questionTitle," ",this.questionText);
      var category=this.questionCategory
      var question=this.questionText
      var subject=this.questionTitle
      var userID=localStorage.getItem("OF_UID")
      var questionObs=this._httpService.askQuestion(subject, question, category, userID)
      questionObs.subscribe(data=>{
        console.log("Response:", data)
        if(data['success']==1){
          this.showBigErr=false
          var destPath='/question/'+data['question']['_id']
          location.reload(true);
          return this._router.navigate([destPath])
        }
        else{
          this.showBigErr=true;
        }
      })
      //on success route to the question
    }
  }
}
