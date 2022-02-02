import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductService } from '@app_services/shop/product/product.service';
import { ProductRoutingModule } from './product.routing.module';
import { SearchProductPage } from './search-product/search-product.page';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductDetailsPage } from './product-details/product-details.page';
import { CommentModule } from '@apppages/comment/comment.module';

@NgModule({
  declarations: [
    SearchProductPage,
    ProductDetailsPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
    ComponentsModule,
    SlickCarouselModule,
    CommentModule,
    NgxSliderModule
  ],
  exports: [
    SearchProductPage
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ProductService]
})
export class ProductModule { }
