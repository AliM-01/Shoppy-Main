import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { IResponse } from '@app_models/_common/IResponse';
import { Observable, throwError } from 'rxjs';
import { CartModel } from '../../_models/order/cart';
import { environment } from '@environments/environment';
import { CartService } from './cart.service';
import { tap, catchError } from 'rxjs/operators';
import { InitializePaymentRequestModel } from '@app_models/order/initialize-payment-request';
import { InitializePaymentResponseModel } from '@app_models/order/initialize-payment-response';
import { PlaceOrderResponseModel } from '../../_models/order/place-order-response';
import { VerifyPaymentRequestModel } from '../../_models/order/verify-payment-request';

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

  checkout(): Observable<IResponse<CartModel>> {
    this.loading.loadingOn();

    const itemsData = this.cartService.getCartItems();

    return this.http.post<IResponse<CartModel>>
      (`${environment.orderBaseApiUrl}/checkout`, itemsData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  placeOrder(cart: CartModel): Observable<IResponse<PlaceOrderResponseModel>> {
    this.loading.loadingOn();

    return this.http.post<IResponse<PlaceOrderResponseModel>>
      (`${environment.orderBaseApiUrl}/place-order`, cart)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  initializePaymentRequest(payment: InitializePaymentRequestModel): Observable<IResponse<InitializePaymentResponseModel>> {
    this.loading.loadingOn();

    let params = new HttpParams()
      .set("amount", payment.amount)
      .set("callBackUrl", payment.callBackUrl)
      .set("email", payment.email)
      .set("orderId", payment.orderId)

    return this.http.post<IResponse<InitializePaymentResponseModel>>
      (`${environment.orderBaseApiUrl}/initialize-payment`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  verifyPayment(payment: VerifyPaymentRequestModel, status: string): Observable<IResponse<InitializePaymentResponseModel>> {
    this.loading.loadingOn();

    let params = new HttpParams()
      .set("authority", payment.authority)
      .set("status", status)
      .set("oId", payment.orderId);

    return this.http.post<IResponse<InitializePaymentResponseModel>>
      (`${environment.orderBaseApiUrl}/verify-payment`, { params })
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
