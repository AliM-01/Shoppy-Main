import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '@app_models/common/IResponse';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient
  ) { }

  getProductCategorysList(): Observable<IResponse<ProductCategoryModel[]>> {
    return this.http.get<IResponse<ProductCategoryModel[]>>(`${environment.shopBaseApiUrl}/product-category/get-list`);
  }
}