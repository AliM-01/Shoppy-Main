import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleDetailsPage } from "./article-details/article-details.page";
import { SearchArticlePage } from "./search-article/search-article.page";

const routes: Routes = [
    {path: '', component: SearchArticlePage, pathMatch: 'full'},
    {path: 'i/:slug', component: ArticleDetailsPage}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BlogRoutingModule { }
