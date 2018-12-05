import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions:any;
  category:string;
  showNo_questions:boolean;
  user_name:string;
  shownQuestions:any;
  questionSearch:string;

  constructor(private _httpService:HttpService, private _router:Router) {
    this.questions = [];
    this.category = "";
    this.user_name = localStorage.getItem('OF_UI_UN');
    this.shownQuestions = [];
    this.questionSearch = "";
  }

  ngOnInit() {
    this.category=localStorage.getItem('category')
    this.fetchQuestions()
  }

  searchQuestions(){
    this.shownQuestions = [];
    console.log("in here");
    this.questions.forEach(element => {
      if(element['subject'].toLowerCase().match(this.questionSearch.toLowerCase())){
        this.shownQuestions.push(element);
      }else if(element['question'].toLowerCase().match(this.questionSearch.toLowerCase())){
        this.shownQuestions.push(element);
      }
    });
  }

  fetchQuestions(){
    var questionObs = this._httpService.fetchQuestions(this.category);
    questionObs.subscribe(data=>{
      if(data['success']==1){
        //succ
        console.log(data);
        this.questions = data['questions'];
        if(this.questions.length == 0){
          this.showNo_questions = true;
        }else{
          this.showNo_questions = false;
          this.shownQuestions = this.questions;
        }
      }else{
        //fail
        this.showNo_questions = true;
      }
    })
  }

  showQuestion(){
    this._router.navigate(['question/17']);
  }

}
