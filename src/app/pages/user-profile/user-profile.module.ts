import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { MyOrdersPage } from './my-orders/my-orders.page';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { WelcomePage } from './welcome/welcome.page';
import { AccountService } from '@app_services/account/account.service';
import { OrderService } from '@app_services/order/order.service';

@NgModule({
  declarations: [
    WelcomePage,
    MyOrdersPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    UserProfileRoutingModule
  ],
  providers: [AccountService, OrderService]
})
export class UserProfileModule { }
