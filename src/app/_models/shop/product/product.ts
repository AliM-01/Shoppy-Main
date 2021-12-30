export class ProductModel {
    constructor(
         public id: number,
         public title: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public price: string,
         public discountedPrice: string,
         public discountRate: number,
         public category: string,
         public hasDiscount: boolean,
         public slug: string
     ){}
 }