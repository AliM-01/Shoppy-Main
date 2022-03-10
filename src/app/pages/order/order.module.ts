import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CartService } from '@app_services/order/cart.service';
import { OrderRoutingModule } from './order.routing.module';
import { CartPage } from './cart/cart.page';
import { PipesModule } from '../../_pipes/pipes.module';
import { CheckoutPage } from './checkout/checkout.page';

@NgModule({
  declarations: [
    CartPage,
    CheckoutPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
  ],
  schemas: [],
  providers: [CartService]
})
export class OrderModule { }
