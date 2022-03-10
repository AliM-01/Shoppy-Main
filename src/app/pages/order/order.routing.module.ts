import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartPage } from "./cart/cart.page";

const routes: Routes = [
    { path:'', component:CartPage }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule { }
