import { Component, Input, OnInit } from '@angular/core';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { environment } from '@environments/environment';
import { ProductModel } from '../../_models/shop/product/product';
import { CartService } from '../../_services/order/cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {

  isInCart: boolean = false;

  @Input() product!: ProductModel;
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor(
    private cartService:CartService,
    private msg: MessengerService,
    ) { }

  ngOnInit(): void {
    this.handleCartChanges();
  }

  handleCartChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      console.log('product change');

      this.checkProductIsInCart();
    })
  }

  checkProductIsInCart() {
    this.cartService.itemInCart(this.product.id).subscribe((res: boolean) => {
      this.isInCart = res;
    })
  }
  addToCart() {
    const item = new CartItemCookieModel(this.product.id, this.product.title, this.product.slug,
      this.product.unitPrice, this.product.imagePath, 1)

    this.cartService.addToCart(item);
    this.msg.sendMsg("added item");
  }

}
