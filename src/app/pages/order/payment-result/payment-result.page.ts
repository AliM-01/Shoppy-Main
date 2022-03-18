import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '@app_services/order/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyPaymentRequestModel } from '@app_models/order/verify-payment-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cart-payment-result',
  templateUrl: './payment-result.page.html'
})
export class PaymentResultPage implements OnInit {

  authority: string = '';
  orderId: string = '';
  resultMsg: string = "";
  resultIssueTracking: string = "";

  constructor(
    private orderService: OrderService,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private cartService: CartService,
  ) {
    this.title.setTitle('نتیجه خرید')
  }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.authority = this.activatedRoute.snapshot.queryParams["authority"];
    this.orderId = this.activatedRoute.snapshot.queryParams["oId"];

    if (this.orderId === undefined || this.orderId === '') {
      this.router.navigate(['/']);
    } else {
      const status = this.activatedRoute.snapshot.queryParams["status"];

      if (status !== "OK") {
        this.resultMsg = "پرداخت با موفقیت انجام نشد. درصورت کسر وجه از حساب، مبلغ تا 24 ساعت دیگر به حساب شما بازگردانده خواهد شد.";
      } else {
        this.verify();
      }
    }
  }

  verify() {
    const payment: VerifyPaymentRequestModel = new VerifyPaymentRequestModel(this.authority, this.orderId);

    this.orderService.verifyPayment(payment).subscribe((res) => {
      this.resultMsg = res.data.msg;
      this.resultIssueTracking = res.data.issueTracking;
    }, (error: HttpErrorResponse) => {
      this.resultMsg = error.error.message;
    })
  }

}
