import { Component, OnInit } from '@angular/core';
import { CartService } from '@app_services/order/cart.service';
import { environment } from '@environments/environment';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  providers: [CartService]
})
export class HeaderCartComponent implements OnInit {

  showAll: boolean = false;

  cartItems: CartItemCookieModel[] = [];
  cartCount = 0;
  cartPrice = 0;
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) {
    this.loadCartItems();
   }

  ngOnInit(): void {
    this.handleCartChanges();
  }

  handleCartChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    const items: CartItemCookieModel[] = this.cartService.getCartItems()

    this.showAll = items.length > 2;
    this.cartItems = items.splice(0 , 2);
    this.cartCount = this.cartService.getCartItemsCount();
    this.cartPrice = this.cartService.itemsTotalPrice
  }

  removeItem(id: string) {
    this.cartService.removeItem(id);
    this.msg.sendMsg("remove item");
  }

}
