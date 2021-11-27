import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IndexComponent } from './index.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';

@NgModule({
  declarations: [
    IndexComponent,
    MainSliderComponent,
    CategoriesSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule
  ],
  exports: [
    IndexComponent,
    MainSliderComponent,
    CategoriesSliderComponent
  ],
  schemas: []
})
export class IndexModule { }
