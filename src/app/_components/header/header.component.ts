import { Component, OnInit } from '@angular/core';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  
  productCategories: ProductCategoryModel[] = [];
  
  constructor(
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if(res.status ==="success"){
        this.productCategories = res.data;
      }
    });
  }

}
