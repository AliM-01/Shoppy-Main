import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app_services/comment/comment.service';
import { CommentModel } from '@app_models/comment/comment';
import { LoadingService } from '@loading';
import { Input } from '@angular/core';

@Component({
  selector: 'app-record-comments',
  templateUrl: './record-comments.component.html'
})
export class RecordCommentsComponent implements OnInit {

  @Input() recordId: number;
  comments: CommentModel[] = [];

  constructor(
    private commentService: CommentService,
    private loading: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.commentService.getRecordCommentsById(this.recordId).subscribe(res => {
      this.comments = res.data;
    });

    this.loading.loadingOff();
  }

}
