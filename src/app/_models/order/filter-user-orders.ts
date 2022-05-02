import { BasePaging, PagingDataSortCreationDateOrder } from '../_common/BasePaging';
import { UserOrderModel } from './user-order';
export class FilterUserOrdersModel extends BasePaging {

  issueTrackingNo: string;
  orders: UserOrderModel[];

  constructor(
    issueTrackingNo: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder
  ) {
    super();
    this.issueTrackingNo = issueTrackingNo;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
  }
}
