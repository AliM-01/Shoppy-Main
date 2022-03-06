import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/IPaging";
import { ArticleModel } from "./article";

export class SearchArticleModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder;
    selectedCategories: string[]
    phrase: string;
    Articles: ArticleModel[];

    constructor(
        phrase: string,
        articles: ArticleModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder
        ){
        this.phrase = phrase;
        this.Articles = articles;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;

    }
}
