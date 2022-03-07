import { CartItemModel } from './cart-item';
export class CartModel {

  constructor() {
    this.items = [];
  }

  totalAmount: number;
  discountAmount: number;
  payAmount: number;
  paymentMethod: number;
  items: CartItemModel[];

  public add(cartItem: CartItemModel) {
    this.items.push(cartItem);
    this.totalAmount += cartItem.totalItemPrice;
    this.discountAmount += cartItem.discountAmount;
    this.payAmount += cartItem.itemPayAmount;
  }

  public SetPaymentMethod(methodId: number) {
    this.paymentMethod = methodId;
  }
}
