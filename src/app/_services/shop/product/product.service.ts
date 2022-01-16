import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { ProductModel } from '@app_models/shop/product/product';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { SearchProductModel } from '@app_models/shop/product/search-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getLatestProducts(): Observable<IResponse<ProductModel[]>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ProductModel[]>>
    (`${environment.shopBaseApiUrl}/product/get-latest`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  searchProduct(search: SearchProductModel): Observable<IResponse<SearchProductModel>> {

    this.loading.loadingOn();

    let params;

    if (search !== null) {
      params = new HttpParams()
        .set('Phrase', search.phrase)
        .set('PageId', search.pageId.toString())
        .set('TakePage', search.takePage.toString())
        .set('SelectedMaxPrice', search.selectedMaxPrice)
        .set('SelectedMinPrice', search.selectedMinPrice)
        .set('SortCreationDateOrder', search.sortCreationDateOrder)
        .set('SearchProductPriceOrder', search.searchProductPriceOrder);
    }

    for (let category of search.selectedCategories) {
      params = params.append('SelectedCategories', category);
    }

    return this.http.get<IResponse<SearchProductModel>>
    (`${environment.shopBaseApiUrl}/product/search`, { params })
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