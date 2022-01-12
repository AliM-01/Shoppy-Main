import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductCategoryDetailsPage } from "./product-category-details/product-category-details.page";

const routes: Routes = [
    { path:'details/s/:slug', component:ProductCategoryDetailsPage },
    { path:'details/i/:id', component:ProductCategoryDetailsPage }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductCategoryRoutingModule { }