import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { AuthService } from '@app_services/auth/auth.service';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ArticleCategoryService, ProductCategoryService]
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  productCategorySelectData: Array<Select2OptionData>;

  productCategories: ProductCategoryModel[] = [];
  articleCategories: ArticleCategoryModel[] = [];

  searchPhrase: string = '';
  selectedCategory: string = '';
  constructor(
    public authService: AuthService,
    public msg: MessengerService,
    private productCategoryService: ProductCategoryService,
    private articleCategoryService: ArticleCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.handleAuthChanges();

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

  handleAuthChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      this.checkAuth();
    })
  }

  checkAuth(){
    this.authService.isUserLoggedInRequest().subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  navigateTo(path: string){
    this.router.navigate([path], { queryParams: { returnUrl: this.router.url } });
  }
}
