import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/common/IResponse';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  getProductCategorysList(): Observable<IResponse<ProductCategoryModel[]>> {
    this.loading.loadingOn();
    return this.http.get<IResponse<ProductCategoryModel[]>>
    (`${environment.shopBaseApiUrl}/product-category/get-list`)
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