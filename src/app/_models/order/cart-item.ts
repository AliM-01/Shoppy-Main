export class CartItemModel {
  constructor(
    public id: string,
    public title: string,
    public unitPrice: number,
    public imagePath: string,
    public imageAlt: string,
    public imageTitle: string,
    public count: number,
    public isInStock: boolean,
    public discountRate: number,
    public discountAmount: number,
    public itemPayAmount: number,
  ) { }

  public get totalItemPrice() {
    return this.unitPrice * this.count;
  }
}
