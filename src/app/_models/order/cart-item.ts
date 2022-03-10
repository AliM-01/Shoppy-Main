export class CartItemModel {
  productId: string;
  title: string;
  slug: string;
  unitPrice: number;
  imagePath: string;
  imageAlt: string;
  imageTitle: string;
  count: number;
  isNotInStock: boolean;
  itemInInventoryCountIsLowerThanRequestedCount: boolean;
  discountRate: number;
  discountAmount: number;
  itemPayAmount: number;

  public get totalItemPrice() {
    return this.unitPrice * this.count;
  }
}
