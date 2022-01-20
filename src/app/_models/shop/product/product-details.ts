import { ProductModel } from "./product";

export class ProductDetailsModel extends ProductModel {
    code:string;
    shortDescription:string;
    description:string;
    inventoryCurrentCount:string;
    metaKeywords:string;
    metaDescription:string;
    
}