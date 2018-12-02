import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private _httpService:HttpService, private _router:Router) {

  }

  ngOnInit() {
  }
  showQuestion(){
    this._router.navigate(['question/17']);
  }

}
