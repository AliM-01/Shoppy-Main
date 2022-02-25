import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ArticleService } from '@app_services/blog/article/article.service';
import { ArticleDetailsPage } from './article-details/article-details.page';
import { BlogRoutingModule } from './blog.routing.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
  declarations: [
    ArticleDetailsPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    BlogRoutingModule,
    CommentModule
  ],
  exports: [
    ArticleDetailsPage
  ],
  schemas: [],
  providers: [ArticleService]
})
export class BlogModule { }
