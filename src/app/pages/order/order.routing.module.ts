import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartPage } from "./cart/cart.page";
import { CheckoutPage } from './checkout/checkout.page';
import { PaymentResultPage } from './payment-result/payment-result.page';

const routes: Routes = [
    { path:'', component:CartPage },
    { path:'checkout', component:CheckoutPage },
    { path:'payment-result/callBack', component:PaymentResultPage },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule { }
