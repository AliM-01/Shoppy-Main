import { ProductModel } from '@app_models/shop/product/product';
import { BasePaging } from '@app_models/_common/BasePaging';

export class FilterProductCategoryRequestModel extends BasePaging {

  slug: string;
  products: ProductModel[];

  constructor(
    slug: string,
    pageId: number,
    takePage: number
  ) {
    super();
    this.slug = slug;
    this.pageId = pageId;
    this.takePage = takePage;

  }
}

