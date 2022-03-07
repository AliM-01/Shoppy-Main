import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { OrderService } from '@app_services/order/order.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ArticleCategoryService, ProductCategoryService, OrderService]
})
export class HeaderComponent implements OnInit {

  productCategories: ProductCategoryModel[] = [];
  articleCategories: ArticleCategoryModel[] = [];

  searchPhrase: string = '';
  selectedCategory: string = '';
  constructor(
    private productCategoryService: ProductCategoryService,
    private articleCategoryService: ArticleCategoryService,
    public orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.productCategories = res.data;
      }
    });
    this.articleCategoryService.getArticleCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.articleCategories = res.data;
      }
    });
  }

  setSelectedCategory(event: any) {
    console.log('slug :', event.target.value);

    this.selectedCategory = event.target.value;
  }

  submitSearch() {
    let queryParams: any = {
      phrase: this.searchPhrase
    }
    if (this.selectedCategory !== undefined && this.selectedCategory !== '') {
      queryParams.categories = [this.selectedCategory]
    }
    this.router.navigate(['/product/search'], { queryParams: queryParams });
  }

}
