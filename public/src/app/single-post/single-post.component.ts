import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  showComments:boolean
  showReply:boolean
  questionID:string
  question:any
  constructor(private _httpService:HttpService, private _activatedRoute:ActivatedRoute, private _router:Router) {
    this.showComments=false
    this.showReply=false
    this.questionID=''
    this.question={}
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params=>{
      this.questionID=params['qid']
      this.fetchQuestion()
    })
  }
  showCommentsFunc(){
    this.showReply=false;
    this.showComments=!this.showComments
  }
  showReplyFunc(){
    this.showComments=false
    this.showReply=!this.showReply
  }
  fetchQuestion(){
    var questionObs=this._httpService.fetchSingleQuestion(this.questionID)
    questionObs.subscribe(data=>{
      if(data['success']==1){
        this.question=data['question']
      }
      else{
        return this._router.navigate(['/'])
      }
    })
  }

}
