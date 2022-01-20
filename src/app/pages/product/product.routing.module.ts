import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductDetailsPage } from "./product-details/product-details.page";
import { SearchProductPage } from "./search-product/search-product.page";

const routes: Routes = [
  {path: 'search', component: SearchProductPage},
  {path: 'details/:slug', component: ProductDetailsPage}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }