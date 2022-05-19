export class ProductModel {
    id: string;
    title: string;
    imagePath: string;
    imageAlt: string;
    imageTitle: string;
    unitPrice: number;
    price: string;
    priceWithDiscount: string;
    discountState: DiscountState;
    discountRate: number;
    category: string;
    categoryId: string;
    categorySlug: string;
    hasDiscount: boolean;
    slug: string
}
export enum DiscountState {
  None = 0,
  Medium = 1,
  High = 2
}
