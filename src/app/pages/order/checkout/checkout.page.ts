import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CartModel } from '@app_models/order/cart';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '@app_services/order/cart.service';
import { InitializePaymentRequestModel } from '@app_models/order/initialize-payment-request';
import { AuthService } from '@app_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html'
})
export class CheckoutPage implements OnInit {

  cart: CartModel = new CartModel();
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private loading: LoadingService,
    private title: Title,
    private msg: MessengerService,
    private cartService: CartService,
  ) {
    this.title.setTitle('سبد خرید')
  }

  ngOnInit(): void {
    this.checkout();
  }

  checkout(): void {
    this.loading.loadingOn();
    this.cartService.loadCart();
    this.orderService.checkout().subscribe(res => {
      this.cart = res.data;
    })
  }

  pay() {
    this.loading.loadingOn();
    this.authService.isUserLoggedInRequest().subscribe(res => {
      if(!res){
        this.router.navigate(['/auth/login'])
      } if(res){
        this.orderService.placeOrder(this.cart)
        .subscribe((res) => {
          console.log('placeOrder', res);

          this.paymentRedirect(res.data.orderId);

        }, () => {
          this.ngOnInit();
        })
      }
    })

  }

  paymentRedirect(oId: string) {
    this.loading.loadingOn();

    const payment = new InitializePaymentRequestModel(oId,
      this.cart.payAmount, "http://localhost:4200/cart/payment-result/callBack?oId=" + oId);

    this.orderService.initializePaymentRequest(payment)
      .subscribe(res => {
        console.log('initializePaymentRequest', res);

        this.loading.loadingOff();
        window.location.href = res.data.redirectUrl;

      });

  }
}
