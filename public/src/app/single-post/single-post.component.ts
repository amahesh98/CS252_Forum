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
  commentText:string
  showCommentErr:boolean
  commentErr:string
  commentSuccess:string
  showCommentSuccess:boolean

  constructor(private _httpService:HttpService, private _activatedRoute:ActivatedRoute, private _router:Router) {
    this.showComments=false
    this.showReply=false
    this.questionID=''
    this.question={}
    this.commentText=''
    this.commentErr='Unable to place comment'
    this.showCommentErr=false
    this.commentSuccess='Successfully placed your comment'
    this.showCommentSuccess=false
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
    this.showCommentErr=false
    this.showCommentSuccess=false
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
  leaveReply(){
    console.log("Leaving comment:", this.commentText)
    var userID=localStorage.getItem("OF_UID")
    if(this.commentText.length==0){
      this.showCommentErr=true
      return
    }
    var commentObs=this._httpService.leaveComment(this.commentText, userID, this.questionID)
    commentObs.subscribe(data=>{
      console.log("Response:", data)
      if(data['success']==1){
        this.showCommentErr=false;
        this.showCommentSuccess=true
        this.commentText=''
        this.fetchQuestion()
        this.showCommentsFunc()
      }
      else{
        this.showCommentErr=true;
      }
    })
  }

}
