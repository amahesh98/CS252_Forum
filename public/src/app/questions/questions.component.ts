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
  constructor(private _httpService:HttpService, private _router:Router) {
    this.questions = {};
    this.category = "Fake";
    this.user_name = localStorage.getItem('OF_UI_UN');
  }

  ngOnInit() {
    this.fetchQuestions()
  }

  fetchQuestions(){
    var questionObs = this._httpService.fetchQuestions(this.category);
    questionObs.subscribe(data=>{
      if(data['success']==1){
        //succ
        this.questions = data['questions'];
        if(this.questions.length == 0){
          this.showNo_questions = true;
        }else{
          this.showNo_questions = false;
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
