import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductService } from '@app_services/shop/product/product.service';
import { ProductRoutingModule } from './product.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
    ComponentsModule,
    SlickCarouselModule
  ],
  exports: [
  ],
  schemas: [],
  providers: [ProductService]
})
export class ProductModule { }
