import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingDataSortCreationDateOrder } from '@app_models/common/IPaging';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ProductCategoryModel } from '../../../_models/shop/product-category/product-category';
import { SearchProductModel, SearchProductPriceOrder } from '../../../_models/shop/product/search-product';
@Component({
  selector: 'search-product',
  templateUrl: './search-product.page.html'
})
export class SearchProductPage implements OnInit {

  pages: number[] = [];
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';
  productCategories: ProductCategoryModel[] = [];
  creationSort: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES
  priceSort: SearchProductPriceOrder = SearchProductPriceOrder.All;
  searchProducts: SearchProductModel = new SearchProductModel('', [], 0, 10,
    this.creationSort, this.priceSort, 0, 0);

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;

      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }

      this.searchProducts.selectedCategories = params.categories ? params.categories : [];

      this.searchProducts.pageId = pageId;
      this.getProducts();
    });

    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.productCategories = res.data;
      }
    })

  }

  setPage(page: number) {
    this.searchProducts.pageId = page;
    this.getProducts();
    this.router.navigate(['/product/search'], { queryParams: { pageId: page, categories: this.searchProducts.selectedCategories } });
  }

  getProducts() {
    this.productService.searchProduct(this.searchProducts).subscribe((res) => {
      this.searchProducts = res.data;

      if (res.data.phrase === null) {
        this.searchProducts.phrase = '';
      }

      this.pages = [];

      if (res.data.selectedCategories === null) {
        this.searchProducts.selectedCategories = [];
      }

      for (let i = this.searchProducts.startPage; i <= this.searchProducts.endPage; i++) {
        this.pages.push(i);
      }
    })
  }

  filterCategories(event: any, catSlug: string) {

    if (this.searchProducts.selectedCategories === undefined || this.searchProducts.selectedCategories === null) {
      this.searchProducts.selectedCategories = [];
    }

    if (event.target.checked) {
      this.searchProducts.selectedCategories.push(catSlug);
      this.setFilterCategories();
    } else {
      this.searchProducts.selectedCategories = this.searchProducts.selectedCategories.filter(s => s !== catSlug);
      this.setFilterCategories();
    }
  }

  setFilterCategories() {
    if (this.searchProducts.selectedCategories.length > 0) {
      this.router.navigate(['/product/search'], { queryParams: { categories: this.searchProducts.selectedCategories } });
    } else {
      this.router.navigate(['/product/search']);
    }
  }
}