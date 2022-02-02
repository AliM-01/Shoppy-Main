import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app_services/comment/comment.service';
import { CommentModel } from '@app_models/comment/comment';
import { LoadingService } from '@loading';
import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentType, AddCommentModel } from '@app_models/comment/add-comment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-record-comments',
  templateUrl: './record-comments.component.html'
})
export class RecordCommentsComponent implements OnInit {

  @Input() recordId: number;
  @Input() recordType: string;
  comments: CommentModel[] = [];

  addCommentForm: FormGroup;
  selectedParentId: number = 0;

  constructor(
    private commentService: CommentService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  ngOnInit(): void {

    this.addCommentForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.max(100)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      text: new FormControl(null, [Validators.required, Validators.max(500)])
    });

    this.loading.loadingOn();

    this.commentService.getRecordCommentsById(this.recordId).subscribe(res => {
      this.comments = res.data;
    });

    this.loading.loadingOff();
  }
  
  checkError(controlName: string, errorName: string): boolean {
    return this.addCommentForm.controls[controlName].hasError(errorName);
  }

  setSelectedParentId(id:number){
    this.selectedParentId = id;
  }

  submitAddCommentForm(){
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
          this.toastr.success(res.message, "موفقیت", { timeOut: 1500 })
        }
      });

    } else {
      this.addCommentForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

}
