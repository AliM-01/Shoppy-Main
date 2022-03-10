import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartPage } from "./cart/cart.page";
import { CheckoutPage } from './checkout/checkout.page';

const routes: Routes = [
    { path:'', component:CartPage },
    { path:'checkout', component:CheckoutPage }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule { }
