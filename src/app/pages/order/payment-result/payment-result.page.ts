import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '@app_services/order/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyPaymentRequestModel } from '@app_models/order/verify-payment-request';
import { HttpErrorResponse } from '@angular/common/http';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';

@Component({
  selector: 'cart-payment-result',
  templateUrl: './payment-result.page.html'
})
export class PaymentResultPage implements OnInit {

  isVerified: boolean = false;
  isResultSuccess: boolean = false;

  authority: string = '';
  orderId: string = '';
  resultMsg: string = "";
  resultIssueTracking: string = "";

  constructor(
    private orderService: OrderService,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    private msg: MessengerService,
    private router: Router,
    private title: Title,
    private cartService: CartService,
  ) {
    this.title.setTitle('نتیجه خرید')
  }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.authority = this.activatedRoute.snapshot.queryParams["Authority"];
    this.orderId = this.activatedRoute.snapshot.queryParams["oId"];
    const status = this.activatedRoute.snapshot.queryParams["Status"];

    console.log('authority', this.authority);
    console.log('orderId', this.orderId);

    if (this.authority === undefined) {
      this.router.navigate(['/']);
    } else {
      console.log('status', status);

      if (status !== "OK") {
        this.resultMsg = "پرداخت با موفقیت انجام نشد. درصورت کسر وجه از حساب، مبلغ تا 24 ساعت دیگر به حساب شما بازگردانده خواهد شد.";
        this.isVerified = true;
      } else {
        this.verify();
      }
    }
  }

  verify() {
    this.loading.loadingOn();

    const payment: VerifyPaymentRequestModel = new VerifyPaymentRequestModel(this.authority, this.orderId);

    this.orderService.verifyPayment(payment).subscribe((res) => {

      this.resultMsg = res.resultMessage;
      this.resultIssueTracking = res.issueTracking;
      this.cartService.clearCart();

      this.msg.sendMsg("clear cart");

      this.isVerified = true;
      this.isResultSuccess = true;

      this.loading.loadingOff();

    }, (error: HttpErrorResponse) => {
      this.resultMsg = error.error.message;
      this.isVerified = true;
      this.isResultSuccess = false;

    })
  }

}
