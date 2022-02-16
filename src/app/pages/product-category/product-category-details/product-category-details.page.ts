import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'product-category-details',
  templateUrl: './product-category-details.page.html'
})
export class ProductCategoryDetailsPage implements OnInit {

  baseProductCategoryPath: string = environment.productCategoryBaseImagePath;

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("دسته بندی ");
  pageTitle$: Observable<string> = this.pageTitleSubject.asObservable();

  productCategorySubject: BehaviorSubject<ProductCategoryModel> = new BehaviorSubject<ProductCategoryModel>(null);
  productCategory$: Observable<ProductCategoryModel> = this.productCategorySubject.asObservable();

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

            this.productCategorySubject.next(res.data);
            this.pageTitleSubject.next(`دسته بندی : ${res.data.title}`);
            this.setMetaTags(res.data);

          }, () => {
            this._location.back();
          });
      } else {
        const categoryId = params.id;

        if (categoryId === undefined) {
          this._location.back();
        } else {

          this.productCategoryService.getProductCategoryById(categoryId)
            .subscribe((res) => {
              this.productCategorySubject.next(res.data);
              this.pageTitleSubject.next(`دسته بندی : ${res.data.title}`);
              this.setMetaTags(res.data);

            }, (error) => {
              this._location.back();
            });
            
        }
      }



    });


  }

  setMetaTags(data: ProductCategoryModel) {
    this.title.setTitle(data.title);
    this.meta.addTags([
      { name: 'keywords', content: data.metaKeywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'shoppy' },
      { name: 'description', content: data.metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}