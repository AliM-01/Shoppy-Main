import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app_services/shop/product/product.service';
import { Input } from '@angular/core';
import { ProductModel } from '@app_models/shop/product/product';

@Component({
  selector: 'product-details-related-products',
  templateUrl: './product-details-related-products.component.html'
})
export class ProductDetailsRelatedProductsComponent implements OnInit {

  @Input() productId: string;
  relatedProducts: ProductModel[] = [];

  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 4, "dots": true,
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
    ]
  };

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getRelated();
  }


  getRelated() {
    this.productService.getRelatedProducts(this.productId)
      .subscribe(res => {
        this.relatedProducts = res.data;
      });
  }
}
