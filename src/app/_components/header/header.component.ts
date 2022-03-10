import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { CartService } from '@app_services/order/cart.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ArticleCategoryService, ProductCategoryService, CartService]
})
export class HeaderComponent implements OnInit {

  productCategorySelectData: Array<Select2OptionData>;

  productCategories: ProductCategoryModel[] = [];
  articleCategories: ArticleCategoryModel[] = [];

  searchPhrase: string = '';
  selectedCategory: string = '';
  constructor(
    private productCategoryService: ProductCategoryService,
    private articleCategoryService: ArticleCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductCategoriesList();
    this.getArticleCategoriesList();
  }

  private getProductCategoriesList(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.productCategories = res.data;

        let searchCategorySelectListData: {
          id: string,
          text: string
        }[] = [];
        for (let i = 0; i < this.productCategories.length; i++) {
          const element = this.productCategories[i];
          searchCategorySelectListData.push(
            {
              id: this.productCategories[i].slug,
              text: this.productCategories[i].title
            });
        }

        this.productCategorySelectData = searchCategorySelectListData;
      }

    });
  }

  private getArticleCategoriesList(): void {
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
