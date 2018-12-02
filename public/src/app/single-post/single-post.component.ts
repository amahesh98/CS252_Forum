import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  showComments:boolean
  showReply:boolean
  constructor(private _httpService:HttpService) {
    this.showComments=false
    this.showReply=false
  }

  ngOnInit() {

  }
  showCommentsFunc(){
    this.showReply=false;
    this.showComments=!this.showComments
  }
  showReplyFunc(){
    this.showComments=false
    this.showReply=!this.showReply
  }

}
