import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { ProductModel } from '@app_models/shop/product/product';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getLatestProducts(): Observable<IResponse<ProductModel[]>> {
    return this.http.get<IResponse<ProductModel[]>>(`${environment.shopBaseApiUrl}/product/get-latest`);
  }
}