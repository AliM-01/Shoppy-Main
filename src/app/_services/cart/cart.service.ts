import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';

export const CART_ITEMS_COOKIE_NAME: string = 'cart_items';

@Injectable({
  providedIn: 'any',
})
export class CartService {

  private itemsCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartItemsSubject: BehaviorSubject<Array<CartItemCookieModel>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) {
    this.loadCart();
  }

  getCartItems(): Observable<Array<CartItemCookieModel>> {
    return this.cartItemsSubject.asObservable();
  }

  getCartItemsCount(): Observable<number> {
    return this.itemsCountSubject.asObservable();
  }

  addToCart(item: CartItemCookieModel) {
    console.log('addd');

    this.loading.loadingOn();

    //-----check if there are items already added in cart
    let existingItems: CartItemCookieModel[] = [];

    if (this.cookieService.check(CART_ITEMS_COOKIE_NAME)) {
      existingItems = JSON.parse(this.cookieService.get(CART_ITEMS_COOKIE_NAME));

      if (existingItems !== null) {
        console.log('Items exists');

        const currentProductInCart: CartItemCookieModel = existingItems.find(x => x.productId === item.productId);
        if (currentProductInCart !== undefined) {
          currentProductInCart.count = currentProductInCart.count + item.count;

          const index = existingItems.findIndex((o) => o.productId === currentProductInCart.productId);

          if (index > -1) {
            existingItems.splice(index, 1);
          }

          existingItems = [currentProductInCart, ...existingItems]

        } else {
          existingItems = [item, ...existingItems]
        }
      } else {
        existingItems = [item];
      }
    }
    else {
      console.log('NO items exists');
      existingItems = [item];
    }

    this.cartItemsSubject.next(existingItems);
    console.log(this.cartItemsSubject.value);

    this.loading.loadingOff();
    this.saveCart();
  }

  loadCart(): void {
    const itemsInCookie = this.cookieService.get(CART_ITEMS_COOKIE_NAME);
    if (itemsInCookie !== undefined && itemsInCookie !== '') {
      const items: CartItemCookieModel[] = JSON.parse(itemsInCookie);
      console.log('load', items);
      this.cartItemsSubject.next(items);
    } else {
      this.cartItemsSubject.next([]);
    }
    this.calculateAllItemsCount();
  }

  saveCart(): void {
    this.cookieService.delete(CART_ITEMS_COOKIE_NAME);

    if (this.cartItemsSubject.value.length > 0) {
      this.cookieService.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(this.cartItemsSubject.value), 200000)
    }

    this.calculateAllItemsCount();
  }

  clearCart() {
    this.cookieService.delete(CART_ITEMS_COOKIE_NAME);
    this.cartItemsSubject.next([]);
    this.calculateAllItemsCount();
  }

  removeItem(productId: string) {
    const index = this.cartItemsSubject.value.findIndex((o) => o.productId === productId);

    if (index > -1) {
      this.cartItemsSubject.value.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(productId: string): Observable<boolean> {
    const exists = this.cartItemsSubject.value.findIndex((o) => o.productId === productId) > -1;

    return of(exists);
  }

  get itemsTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItemsSubject.value) {
      totalPrice = totalPrice + item.unitPrice;
    }
    return totalPrice;
  }

  private calculateAllItemsCount() {
    let count = 0;
    for (const item of this.cartItemsSubject.value) {
      count = count + item.count;
    }
    console.log('count', count);

    this.itemsCountSubject.next(count);
    console.log(this.itemsCountSubject.value);

  }
}
