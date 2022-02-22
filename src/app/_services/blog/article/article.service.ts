import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { ArticleModel } from '@app_models/blog/article/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getLatestArticles(): Observable<IResponse<ArticleModel[]>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ArticleModel[]>>
      (`${environment.blogBaseApiUrl}/article/get-latest`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getArticleDetails(): Observable<IResponse<ArticleModel[]>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ArticleModel[]>>
      (`${environment.blogBaseApiUrl}/article/get-latest`)
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