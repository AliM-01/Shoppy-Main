import { ProductFeatureModel } from "../product-feature/product-feature";
import { ProductPictureModel } from "../product-picture/product-picture";
import { ProductModel } from "./product";

export class ProductDetailsModel extends ProductModel {
    code:string;
    shortDescription:string;
    description:string;
    inventoryCurrentCount:number;
    metaKeywords:string;
    metaDescription:string;
    productPictures: ProductPictureModel[] = [];
    productFeatures: ProductFeatureModel[] = [];
}