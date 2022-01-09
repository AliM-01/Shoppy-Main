import { ProductModel } from '@app_models/shop/product/product';
export class ProductCategoryModel {
    constructor(
         public id: number,
         public title: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public slug: string,
         public products: ProductModel[],
     ){}
 }