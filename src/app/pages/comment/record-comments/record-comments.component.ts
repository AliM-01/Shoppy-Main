import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app_services/comment/comment.service';
import { CommentModel } from '@app_models/comment/comment';
import { LoadingService } from '@loading';
import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentType, AddCommentModel } from '@app_models/comment/add-comment';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-record-comments',
  templateUrl: './record-comments.component.html'
})
export class RecordCommentsComponent implements OnInit {

  @Input() recordId: number;
  @Input() recordType: string;

  commentsSubject: BehaviorSubject<CommentModel[]> = new BehaviorSubject<CommentModel[]>([]);
  comments$: Observable<CommentModel[]> = this.commentsSubject.asObservable();

  addCommentForm: FormGroup;
  selectedParentId: string = "0";

  constructor(
    private commentService: CommentService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.addCommentForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.max(100)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      text: new FormControl(null, [Validators.required, Validators.max(500)])
    });

    this.loading.loadingOn();

    this.commentService.getRecordCommentsById(this.recordId).subscribe(res => {
      console.log(res);
      
      this.commentsSubject.next(res.data);
    });

    this.loading.loadingOff();
  }

  checkError(controlName: string, errorName: string): boolean {
    var control = this.addCommentForm.controls[controlName];

    if (control.touched && control.hasError(errorName))
      return true;

    return false;
  }

  setSelectedParentId(el: HTMLElement, id: string) {
    this.selectedParentId = id;

    el.scrollIntoView();
  }

  submitAddCommentForm() {
    this.loading.loadingOn();

    if (this.addCommentForm.valid) {

      const addData = new AddCommentModel(
        this.addCommentForm.controls.name.value,
        this.addCommentForm.controls.email.value,
        this.addCommentForm.controls.text.value,
        (this.recordType as CommentType),
        this.recordId,
        this.selectedParentId
      );

      this.commentService.addComment(addData).subscribe(res => {
        if (res.status === 'success') {
          this.addCommentForm.reset();
        }
      });

    } else {
      this.addCommentForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

}
