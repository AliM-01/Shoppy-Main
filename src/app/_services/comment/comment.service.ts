import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CommentModel } from '@app_models/comment/comment';
import { IResponse } from '@app_models/_common/IResponse';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }
  
  getRecordCommentsById(recordId: number): Observable<IResponse<CommentModel[]>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<CommentModel[]>>
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
}