import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@loading';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';
import { Meta, Title } from '@angular/platform-browser';
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
    private _location: Location,
    private title: Title,
    private meta: Meta,
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

    this.setMetaTags();

  }
  
  setMetaTags(){
    this.title.setTitle(this.productCategory.title);
    this.meta.addTags([
      { name: 'keywords', content: this.productCategory.metaKeywords },
      { name: 'robots', content: 'index, follow' }, 
      { name: 'author', content: 'shoppy'},
      { name: 'description', content: this.productCategory.metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8'}
    ]);
  }
}