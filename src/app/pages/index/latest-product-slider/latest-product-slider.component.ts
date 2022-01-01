import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@app_models/shop/product/product';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'index-latest-product-slider',
  templateUrl: './latest-product-slider.component.html'
})
export class LatestProductSliderComponent implements OnInit {

  isDataLoaded: boolean = false;
  products: ProductModel[] = [];
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 1, "dots": false,
     "fade": false, "loop": true, "arrows": true, "responsive": [
      {
          breakpoint: 1199,
          settings: {
              slidesToShow: 3,
          }
      },
      {
          breakpoint: 991,
          settings: {
              slidesToShow: 2,
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
  ], 
  prevArrow: '<span class="pro-icon-1-prev"><i class="far fa-angle-left"></i></span>',
  nextArrow: '<span class="pro-icon-1-next"><i class="far fa-angle-right"></i></span>'};

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.productService.getLatestProducts().subscribe(res => {
      if(res.status ==="success"){
        this.products = res.data;
        
        this.isDataLoaded = true;
      }
    })
  }
}
