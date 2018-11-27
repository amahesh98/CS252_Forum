import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute }  from '@angular/router';
import { HttpService }  from '../http.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  questionCategory:string;
  questionTitle:string;
  questionUser:any;
  questionText:string;
  showErr_title:boolean;
  showErr_question:boolean;
  showSuccess:boolean;
  showFailure:boolean;

  constructor(private _Activatedroute: ActivatedRoute, private _router:Router, private _httpService:HttpService) {
    this.questionCategory = "";
    this.questionText = "";
    this.questionUser = "";
    this.showErr_question = false;
    this.showErr_title = false;
    this.showSuccess = false;
    this.showFailure = false;
   }

  ngOnInit() {

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

    if(!this.showErr_title && !this.showErr_question){
      console.log("send post question request",this.questionTitle," ",this.questionText);
      //on success route to the question
    }
  }
}
