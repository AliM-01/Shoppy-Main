import { BasePaging, PagingDataSortCreationDateOrder } from "@app_models/_common/BasePaging";
import { ProductModel } from "./product";

export class SearchProductModel extends BasePaging {

  selectedCategories: string[]
  phrase: string;
  products: ProductModel[];
  searchProductPriceOrder: SearchProductPriceOrder = SearchProductPriceOrder.All;
  filterMinPrice: number;
  filterMaxPrice: number;
  selectedMinPrice: number;
  selectedMaxPrice: number;

  constructor(
    phrase: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    searchProductPriceOrder: SearchProductPriceOrder,
    selectedMinPrice: number,
    selectedMaxPrice: number
  ) {
    super();
    this.phrase = phrase;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.searchProductPriceOrder = searchProductPriceOrder;
    this.selectedMinPrice = selectedMinPrice;
    this.selectedMaxPrice = selectedMaxPrice;

  }
}

export enum SearchProductPriceOrder {
  All,
  Price_Des,
  Price_Asc
}
