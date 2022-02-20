import { FilterProductCategoryRequestModel } from './filter-product-category-request';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';

export class FilterProductCategoryResponseModel {
    constructor(
        public productCategory: ProductCategoryModel,
        public filterData: FilterProductCategoryRequestModel) { }
    
}
