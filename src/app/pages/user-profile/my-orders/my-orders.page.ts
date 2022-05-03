import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PagingDataSortCreationDateOrder } from '@app_models/_common/BasePaging';
import { OrderService } from '@app_services/order/order.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { FilterUserOrdersModel } from '../../../_models/order/filter-user-orders';

@Component({
  selector: 'user-dashboard-my-orders',
  templateUrl: './my-orders.page.html'
})
export class MyOrdersPage {

  pages: number[] = [];
  creationSort: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
  isDataLoaded: boolean = false;
  filterOrders: FilterUserOrdersModel = new FilterUserOrdersModel("", 0, 5, this.creationSort);

  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadingService.loadingOn();
    this.title.setTitle("سفارشات من");
  }



}
