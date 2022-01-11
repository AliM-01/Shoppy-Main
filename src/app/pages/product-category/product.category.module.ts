import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ProductCategoryRoutingModule } from './product.category.routing.module';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryDetailsPage } from './product-category-details/product-category-details.page';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';

@NgModule({
  declarations: [
    ProductCategoryDetailsPage,
    CategoriesSliderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductCategoryRoutingModule,
    ComponentsModule,
    SlickCarouselModule
  ],
  exports: [ 
    ProductCategoryDetailsPage,
    CategoriesSliderComponent
  ],
  schemas: [],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule { }
