import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  productCategories: ProductCategoryModel[] = [];
  searchPhrase: string = '';
  selectedCategory: string = '';
  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.productCategories = res.data;
      }
    });
  }

  setSelectedCategory(event: any) {
    console.log('slug :', event.target.value);

    this.selectedCategory = event.target.value;
  }

  submitSearch() {
    console.log(this.searchPhrase);
    console.log(this.selectedCategory);
    let queryParams: any = {
      phrase: this.searchPhrase
    }
    if (this.selectedCategory !== undefined && this.selectedCategory !== '') {
      queryParams.categories = [this.selectedCategory]
    }
    this.router.navigate(['/product/search'], { queryParams: queryParams });
  }

}
