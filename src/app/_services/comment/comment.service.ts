import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CommentModel } from '@app_models/comment/comment';
import { IResponse } from '@app_models/_common/IResponse';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AddCommentModel } from '@app_models/comment/add-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getRecordCommentsById(recordId: string): Observable<CommentModel[]> {
    this.loading.loadingOn();

    return this.http.get<CommentModel[]>
      (`${environment.commentBaseApiUrl}/get-comments/${recordId}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  addComment(addCommentData: AddCommentModel): Observable<IResponse> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('name', addCommentData.name);
    formData.append('email', addCommentData.email);
    formData.append('text', addCommentData.text);
    formData.append('type', addCommentData.type.toString());
    formData.append('ownerRecordId', addCommentData.ownerRecordId);

    if(addCommentData.parentId !== null){
      formData.append('parentId', addCommentData.parentId);
    }

    return this.http.post<IResponse>
      (`${environment.commentBaseApiUrl}/add`, formData)
      .pipe(
        tap((res) => {
          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.loading.loadingOff()
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }
}
