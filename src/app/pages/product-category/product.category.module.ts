import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ProductCategoryRoutingModule } from './product.category.routing.module';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryDetailsPage } from './product-category-details/product-category-details.page';

@NgModule({
  declarations: [
    ProductCategoryDetailsPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductCategoryRoutingModule,
    ComponentsModule,
  ],
  exports: [
  ],
  schemas: [],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule { }
