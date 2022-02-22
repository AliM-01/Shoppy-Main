import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ArticleService } from '@app_services/blog/article/article.service';
import { BlogRoutingModule } from './blog.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    BlogRoutingModule
  ],
  exports: [
  ],
  schemas: [],
  providers: [ArticleService]
})
export class BlogModule { }
