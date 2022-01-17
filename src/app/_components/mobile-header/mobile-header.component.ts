import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
})
export class MobileHeaderComponent implements OnInit {

  productCategories: ProductCategoryModel[] = [];
  searchPhrase: string = '';
  
  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if(res.status ==="success"){
        this.productCategories = res.data;
      }
    });
  }

  submitSearch() {
    this.router.navigate(['/product/search'], { queryParams: { phrase: this.searchPhrase } });
  }
}
