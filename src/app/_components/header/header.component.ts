import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ArticleCategoryService, ProductCategoryService]
})
export class HeaderComponent implements OnInit, AfterViewInit {

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
      this.productCategories = res;

      let searchCategorySelectListData: {
        id: string,
        text: string
      }[] = [];
      for (let i = 0; i < this.productCategories.length; i++) {

        searchCategorySelectListData.push(
          {
            id: this.productCategories[i].slug,
            text: this.productCategories[i].title
          });
      }

      this.productCategorySelectData = searchCategorySelectListData;
    });
  }

  private getArticleCategoriesList(): void {
    this.articleCategoryService.getArticleCategoriesList().subscribe(res => this.articleCategories = res);
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

  ngAfterViewInit(): void {
    const header = document.getElementsByClassName("sticky-bar")[0];
    const scrollUpBtn = document.getElementById("scrollUp");

    window.addEventListener("scroll", () => {
      const scroll = document.documentElement.scrollTop;
      if (scroll > 20 || scroll > 20) {
        scrollUpBtn.style.display = "block";
      } else {
        scrollUpBtn.style.display = "none";
      }

      if (scroll < 200) {
        header.classList.remove('stick');
      } else {
        header.classList.add('stick');
      }
    });
  }
}
