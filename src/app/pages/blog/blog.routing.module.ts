import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleDetailsPage } from "./article-details/article-details.page";

const routes: Routes = [
    {path: 'i/:slug', component: ArticleDetailsPage}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BlogRoutingModule { }