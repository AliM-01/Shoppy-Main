import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
@Component({
  selector: 'product-category-details',
  templateUrl: './product-category-details.page.html'
})
export class ProductCategoryDetailsPage implements OnInit {

  slug: string = '';
  productCategory!: ProductCategoryModel;

  constructor(
    private productCategoryService: ProductCategoryService,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const slug = params.slug;

      if (slug === undefined) {
        this._location.back();
      }
      this.slug = slug;

      this.productCategoryService.getProductCategory(this.slug)
        .subscribe((res) => {
          if (res.status === 'success') {
            this.productCategory = res.data;
          }
        }, (error) => {
          this._location.back();
        });

    });

  }
}