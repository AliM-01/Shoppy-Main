import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IndexComponent } from './index.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { LatestProductSliderComponent } from './latest-product-slider/latest-product-slider.component';
import { ProductCategoryModule } from '@apppages/product-category/product.category.module';

@NgModule({
  declarations: [
    IndexComponent,
    MainSliderComponent,
    LatestProductSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule,
    ProductCategoryModule
  ],
  exports: [
    IndexComponent,
    MainSliderComponent,
    LatestProductSliderComponent
  ],
  schemas: []
})
export class IndexModule { }
