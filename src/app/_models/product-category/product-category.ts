export class ProductCategoryModel {
    constructor(
         public id: number,
         public title: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public slug: string
     ){}
 }