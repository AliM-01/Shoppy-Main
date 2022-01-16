import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchProductPage } from "./search-product/search-product.page";

const routes: Routes = [
  {path: 'search', component: SearchProductPage}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }