import { ProductModel } from '@app_models/shop/product/product';
import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/IPaging';

export class FilterProductCategoryRequestModel implements IPaging {

    pageId: number;
    dataCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder;

    slug: string;
    products: ProductModel[];

    constructor(
        slug: string,
        products: ProductModel[],
        pageId: number,
        takePage: number
    ) {
        this.slug = slug;
        this.products = products;
        this.pageId = pageId;
        this.takePage = takePage;

    }
}

