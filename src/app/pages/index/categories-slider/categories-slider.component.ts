import { Component, OnInit } from '@angular/core';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'index-categories-slider',
  templateUrl: './categories-slider.component.html'
})
export class CategoriesSliderComponent implements OnInit {

  isDataLoaded: boolean = false;
  productCategories: ProductCategoryModel[] = [];
  baseProductCategoryPath: string = environment.productCategoryBaseImagePath;
  slideConfig = {"slidesToShow": 6, "slidesToScroll": 1, "dots": false,
     "fade": false, "loop": true, "arrows": true, "responsive": [
      {
          breakpoint: 1199,
          settings: {
              slidesToShow: 4,
          }
      },
      {
          breakpoint: 991,
          settings: {
              slidesToShow: 3,
          }
      },
      {
          breakpoint: 767,
          settings: {
              slidesToShow: 2,
          }
      },
      {
          breakpoint: 575,
          settings: {
              slidesToShow: 1,
          }
      }
  ]};

  constructor(
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {

    this.productCategoryService.getProductCategorysList().subscribe(res => {
      if(res.status ==="success"){
        this.productCategories = res.data;
        
        this.isDataLoaded = true;
      }
    })
  }
}
