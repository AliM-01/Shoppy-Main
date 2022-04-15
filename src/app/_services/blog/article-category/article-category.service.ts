import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
@Injectable({
  providedIn: 'root'
})
export class ArticleCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  getArticleCategoriesList(): Observable<ArticleCategoryModel[]> {
    this.loading.loadingOn();
    return this.http.get<ArticleCategoryModel[]>
      (`${environment.blogBaseApiUrl}/article-category/get-all`)
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
