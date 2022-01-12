export class ProductModel {
    constructor(
         public id: number,
         public title: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public price: string,
         public priceWithDiscount: string,
         public discountRate: number,
         public category: string,
         public categoryId: string,
         public hasDiscount: boolean,
         public slug: string
     ){}
 }