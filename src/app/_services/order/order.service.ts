import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';

export const CART_ITEMS_COOKIE_NAME: string = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private itemsCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsCount$: Observable<number> = this.itemsCountSubject.asObservable();

  cartItemsSubject: BehaviorSubject<Array<CartItemCookieModel>> = new BehaviorSubject([]);
  cartItems$: Observable<Array<CartItemCookieModel>> = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  addToCart(item: CartItemCookieModel) {
    this.loading.loadingOn();

    //-----check if there are items already added in cart
    let existingItems: CartItemCookieModel[] = [];
    if (this.cookieService.check(CART_ITEMS_COOKIE_NAME)) {
      //----- update by adding new items
      existingItems = JSON.parse(this.cookieService.get(CART_ITEMS_COOKIE_NAME));
      existingItems = [item, ...existingItems];
      console.log('Items exists');
    }
    //-----if no items, add new items
    else {
      console.log('NO items exists');
      existingItems = [item];
    }

    const currentProduct: CartItemCookieModel = existingItems.find(x => x.productId === item.productId);
    if (currentProduct !== undefined) {
      existingItems.find(x => x.productId === item.productId).count = currentProduct.count + item.count;
    }

    this.cartItemsSubject.next(existingItems);

    this.loading.loadingOff();
    this.syncCart();
  }

  loadCart(): void {
    let items: CartItemCookieModel[] = JSON.parse(this.cookieService.get(CART_ITEMS_COOKIE_NAME)) ?? [];
    this.cartItemsSubject.next(items);
  }

  syncCart(): void {
    this.cookieService.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(this.cartItemsSubject.value), 200000)
    this.loadCart();

    let count = 0;
    for (const item of this.cartItemsSubject.value) {
      count = count + item.count;
    }

    this.itemsCountSubject.next(count);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.cookieService.delete(CART_ITEMS_COOKIE_NAME);
    this.syncCart();
  }

  removeItem(productId: string) {
    const index = this.cartItemsSubject.value.findIndex((o) => o.productId === productId);

    if (index > -1) {
      this.cartItemsSubject.value.splice(index, 1);
      this.syncCart();
    }
  }

  itemInCart(productId: string): boolean {
    return this.cartItemsSubject.value.findIndex((o) => o.productId === productId) > -1;
  }

  get totalPrice():number {
    let totalPrice = 0;
    for (const item of this.cartItemsSubject.value) {
      totalPrice = totalPrice + item.unitPrice;
    }
    return totalPrice;
  }
}
