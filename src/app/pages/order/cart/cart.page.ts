import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CartModel } from '@app_models/order/cart';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '@app_services/order/cart.service';

@Component({
  selector: 'my-cart',
  templateUrl: './cart.page.html'
})
export class CartPage implements OnInit {

  cart: CartModel = new CartModel();
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor(
    private orderService: OrderService,
    private loading: LoadingService,
    private title: Title,
    private msg: MessengerService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.handleCartChanges();
    this.computeCart();
  }

  computeCart(): void {
    this.loading.loadingOn();

    this.orderService.computeCart().subscribe(res => {
      this.cart = res.data;
    })
  }

  handleCartChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      this.computeCart();
    })
  }

  clearCart() {
    this.cartService.clearCart();
    this.msg.sendMsg("clear cart");
  }

  removeFromCart(productId: string) {
    this.cartService.removeItem(productId);
    this.msg.sendMsg("remove item");
  }
}
