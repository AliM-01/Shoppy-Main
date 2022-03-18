import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '@app_services/order/cart.service';

@Component({
  selector: 'cart-payment-result',
  templateUrl: './payment-result.page.html'
})
export class PaymentResultPage implements OnInit {

  constructor(
    private orderService: OrderService,
    private loading: LoadingService,
    private title: Title,
    private msg: MessengerService,
    private cartService: CartService,
  ) {
    this.title.setTitle('سبد خرید')
  }

  ngOnInit(): void {
  }

}
