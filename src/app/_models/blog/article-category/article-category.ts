
export class ArticleCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public imagePath: string,
         public slug: string,
         public canonicalAddress:string,
     ){}
 }