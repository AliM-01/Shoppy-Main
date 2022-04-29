import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/BasePaging";
import { ArticleModel } from "./article";

export class SearchArticleModel extends BasePaging {
  selectedCategories: string[]
  phrase: string;
  articles: ArticleModel[];

  constructor(
    phrase: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder
  ) {
    super();
    this.phrase = phrase;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;

  }
}
