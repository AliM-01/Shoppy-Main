import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { IResponse } from '@app_models/_common/IResponse';
import { Observable, throwError } from 'rxjs';
import { CartModel } from '../../_models/order/cart';
import { environment } from '@environments/environment';
import { CartService } from './cart.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) {
  }

  computeCart(): Observable<IResponse<CartModel>> {
    this.loading.loadingOn();

    const itemsData = this.cartService.getCartItems();

    return this.http.post<IResponse<CartModel>>
      (`${environment.orderBaseApiUrl}/compute-cart`, itemsData)
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
