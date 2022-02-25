import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IndexComponent } from './index.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { LatestProductSliderComponent } from './latest-product-slider/latest-product-slider.component';
import { ProductCategoryModule } from '@apppages/product-category/product.category.module';
import { ComponentsModule } from '../../_components/components.module';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { ProductModule } from '@app/pages/product/product.module';
import { LatestArticleComponent } from './latest-article-slider/latest-article.component';

@NgModule({
  declarations: [
    IndexComponent,
    MainSliderComponent,
    LatestProductSliderComponent,
    LatestArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SlickCarouselModule,
    ProductCategoryModule,
    ProductModule
  ],
  exports: [
    IndexComponent,
    MainSliderComponent,
    LatestProductSliderComponent,
    LatestArticleComponent
  ],
  schemas: [],
  providers: [SliderService]
})
export class IndexModule { }
