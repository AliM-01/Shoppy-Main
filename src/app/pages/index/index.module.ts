import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IndexComponent } from './index.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';
import { LatestProductSliderComponent } from './latest-product-slider/latest-product-slider.component';

@NgModule({
  declarations: [
    IndexComponent,
    MainSliderComponent,
    CategoriesSliderComponent,
    LatestProductSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule
  ],
  exports: [
    IndexComponent,
    MainSliderComponent,
    CategoriesSliderComponent,
    LatestProductSliderComponent
  ],
  schemas: []
})
export class IndexModule { }
