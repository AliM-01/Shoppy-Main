import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { ArticleModel } from '@app_models/blog/article/article';
import { ArticleDetailsModel } from '../../../_models/blog/article/article-details';
import { SearchArticleModel } from '@app_models/blog/article/search-article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  searchArticle(search: SearchArticleModel): Observable<IResponse<SearchArticleModel>> {

    this.loading.loadingOn();

    let params = new HttpParams()
      .set('PageId', search.pageId.toString())
      .set('TakePage', search.takePage.toString());

    if(search.phrase !== "" && search.phrase !== undefined){
      params.set('Phrase', search.phrase);
    }

    if (search.selectedCategories !== null && search.selectedCategories?.length) {
      for (let category of search.selectedCategories) {
        params = params.append('SelectedCategories', category);
      }
    } else {
      search.selectedCategories = [];
    }

    return this.http.get<IResponse<SearchArticleModel>>
      (`${environment.blogBaseApiUrl}/article/search`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

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

  getArticleDetails(slug: string): Observable<IResponse<ArticleDetailsModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ArticleDetailsModel>>
      (`${environment.blogBaseApiUrl}/article/${slug}`)
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
