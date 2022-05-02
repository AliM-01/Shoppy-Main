import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { IResponse } from '@app_models/_common/IResponse';
import { Observable, throwError } from 'rxjs';
import { CartModel } from '@app_models/order/cart';
import { environment } from '@environments/environment';
import { CartService } from './cart.service';
import { tap, catchError } from 'rxjs/operators';
import { InitializePaymentRequestModel } from '@app_models/order/initialize-payment-request';
import { InitializePaymentResponseModel } from '@app_models/order/initialize-payment-response';
import { PlaceOrderResponseModel } from '@app_models/order/place-order-response';
import { VerifyPaymentRequestModel } from '@app_models/order/verify-payment-request';
import { VerifyPaymentResponseModel } from '@app_models/order/verify-payment-response';
import { FilterUserOrdersModel } from '@app_models/order/filter-user-orders';

@Injectable({
  providedIn: 'any',
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private toastr: ToastrService,
    private loading: LoadingService
  ) {
  }

  getMyOrders(filter: FilterUserOrdersModel): Observable<FilterUserOrdersModel> {
    this.loading.loadingOn();

    let params = new HttpParams()
      .set('PageId', filter.pageId.toString())
      .set('TakePage', filter.takePage.toString());

    if(filter.issueTrackingNo !== null) {
      params = params.set('issueTrackingNo', filter.issueTrackingNo)
    }

    return this.http.get<FilterUserOrdersModel>
      (`${environment.orderBaseApiUrl}/my-orders`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  computeCart(): Observable<CartModel> {
    this.loading.loadingOn();

    const itemsData = this.cartService.getCartItems();

    return this.http.post<CartModel>
      (`${environment.cartBaseApiUrl}/compute`, itemsData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  checkout(): Observable<CartModel> {
    this.loading.loadingOn();

    const itemsData = this.cartService.getCartItems();

    return this.http.post<CartModel>
      (`${environment.cartBaseApiUrl}/checkout`, itemsData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  placeOrder(cart: CartModel): Observable<PlaceOrderResponseModel> {
    this.loading.loadingOn();

    return this.http.post<PlaceOrderResponseModel>
      (`${environment.orderBaseApiUrl}/place`, cart)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  initializePaymentRequest(payment: InitializePaymentRequestModel): Observable<InitializePaymentResponseModel> {
    this.loading.loadingOn();

    let params = new HttpParams()
      .set("amount", payment.amount)
      .set("callBack", payment.callBackUrl)
      .set("oId", payment.orderId)

    return this.http.post<InitializePaymentResponseModel>
      (`${environment.orderBaseApiUrl}/payment/init`, null, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  verifyPayment(payment: VerifyPaymentRequestModel): Observable<VerifyPaymentResponseModel> {
    this.loading.loadingOn();

    let params = new HttpParams()
      .set("authority", payment.authority)
      .set("oId", payment.orderId);

    return this.http.post<VerifyPaymentResponseModel>
      (`${environment.orderBaseApiUrl}/payment/verify`, null, { params })
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
