import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { ProductModel } from '@app_models/shop/product/product';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { SearchProductModel } from '@app_models/shop/product/search-product';
import { ProductDetailsModel } from '../../../_models/shop/product/product-details';

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
    console.log('service', search);

    let params = new HttpParams()
      .set('PageId', search.pageId.toString())
      .set('Phrase', ((search.phrase !== undefined && search.phrase !== null && search.phrase !== "") ? search.phrase : ''))
      .set('TakePage', search.takePage.toString())
      .set('SelectedMaxPrice', search.selectedMaxPrice)
      .set('SelectedMinPrice', search.selectedMinPrice)
      .set('SortCreationDateOrder', search.sortCreationDateOrder)
      .set('SearchProductPriceOrder', search.searchProductPriceOrder);

    if (search.selectedCategories !== null && search.selectedCategories?.length) {
      for (let category of search.selectedCategories) {
        params = params.append('SelectedCategories', category);
      }
    } else {
      search.selectedCategories = [];
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

  getProductDetails(slug:string): Observable<IResponse<ProductDetailsModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ProductDetailsModel>>
      (`${environment.shopBaseApiUrl}/product/${slug}`)
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