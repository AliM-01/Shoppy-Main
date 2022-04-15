import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
})
export class MobileHeaderComponent implements OnInit {

  productCategories: ProductCategoryModel[] = [];
  articleCategories: ArticleCategoryModel[] = [];
  searchPhrase: string = '';

  constructor(
    private productCategoryService: ProductCategoryService,
    private articleCategoryService: ArticleCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => this.productCategories = res);
    this.articleCategoryService.getArticleCategoriesList().subscribe(res => this.articleCategories = res);
  }

  submitSearch() {
    this.router.navigate(['/product/search'], { queryParams: { phrase: this.searchPhrase } });
  }
}
