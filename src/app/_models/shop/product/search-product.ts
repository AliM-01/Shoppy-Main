import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/common/IPaging";
import { ProductModel } from "./product";

export class SearchProductModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder;
    startPage: number;
    endPage: number;

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
        products: ProductModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        searchProductPriceOrder: SearchProductPriceOrder,
        selectedMinPrice: number,
        selectedMaxPrice: number
        ){
        this.phrase = phrase;
        this.products = products;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.searchProductPriceOrder = searchProductPriceOrder;
        this.selectedMinPrice = selectedMinPrice;
        this.selectedMaxPrice = selectedMaxPrice;
        
    }
}

export enum SearchProductPriceOrder
{
    All,
    Price_Des,
    Price_Asc
}