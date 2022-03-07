export class CartItemCookieModel {
  constructor(
    public productId: string,
    public productTitle: string,
    public productSlug: string,
    public unitPrice: number,
    public productImg: string,
    public count: number
  ) { }
}
