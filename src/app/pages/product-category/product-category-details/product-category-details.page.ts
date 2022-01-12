import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';
@Component({
  selector: 'product-category-details',
  templateUrl: './product-category-details.page.html'
})
export class ProductCategoryDetailsPage implements OnInit {

  baseProductCategoryPath: string = environment.productCategoryBaseImagePath;
  productCategory!: ProductCategoryModel;
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor(
    private productCategoryService: ProductCategoryService,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const slug = params.slug;

      if (slug !== undefined) {
        this.productCategoryService.getProductCategoryBySlug(slug)
          .subscribe((res) => {
            if (res.status === 'success') {
              this.productCategory = res.data;
            }
          }, (error) => {
            this._location.back();
          });
      } else {
        const categoryId = params.id;

        if (categoryId === undefined) {
          this._location.back();
        } else {
          this.productCategoryService.getProductCategoryById(categoryId)
            .subscribe((res) => {
              if (res.status === 'success') {
                this.productCategory = res.data;
              }
            }, (error) => {
              this._location.back();
            });
        }
      }



    });

  }
}