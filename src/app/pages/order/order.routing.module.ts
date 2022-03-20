import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CheckoutNotEmptyGuard } from "@app_guards/order/checkout-not-empty.guard";
import { AuthGuard } from "@app_guards/auth/auth.guard";
import { CartPage } from "./cart/cart.page";
import { CheckoutPage } from './checkout/checkout.page';
import { PaymentResultPage } from './payment-result/payment-result.page';

const routes: Routes = [
    { path:'', component:CartPage },
    { path:'checkout', component:CheckoutPage, canActivate: [CheckoutNotEmptyGuard] },
    { path:'payment-result/callBack', component:PaymentResultPage, canActivate: [AuthGuard] },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule { }
