import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
@Component({
  selector: 'product-category-details',
  templateUrl: './product-category-details.page.html'
})
export class ProductCategoryDetailsPage implements OnInit {

  constructor(
      private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {

   
  }
}