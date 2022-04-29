import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingDataSortCreationDateOrder } from '@app_models/_common/BasePaging';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { SearchProductModel, SearchProductPriceOrder } from '@app_models/shop/product/search-product';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '@app_services/_common/loading/loading.service';

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
  currentPriceSortSelected = [0, "همه"];
  currentCreationSortSelected = [0, "جدیدترین"];
  searchPhrase: string = '';
  searchProducts: SearchProductModel = new SearchProductModel(this.searchPhrase, 0, 10,
    this.creationSort, this.priceSort, 0, 0);
  isDataLoaded: boolean = false;
  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private loadingService: LoadingService,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadingService.loadingOn();
    this.title.setTitle("جستجو محصولات");
  }

  ngOnInit(): void {
    this.loadingService.loadingOn();

    this.isDataLoaded = false;

    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;

      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.searchProducts.phrase = params.phrase;
      this.searchPhrase = params.phrase;

      let selectedCategoryParams: string[];

      if (typeof params?.categories === "string") {
        selectedCategoryParams = [params?.categories]
      } else if (typeof params?.categories === "object") {
        selectedCategoryParams = params?.categories
      }

      if (selectedCategoryParams !== null && selectedCategoryParams !== undefined && selectedCategoryParams.length) {
        this.searchProducts.selectedCategories = selectedCategoryParams;
      }

      this.searchProducts.pageId = pageId;
      this.getProducts();
    });

    this.productCategoryService.getProductCategoriesList().subscribe(res => this.productCategories = res);

  }

  setPage(page: number) {
    this.loadingService.loadingOn();

    let queryParams: any = {
      pageId: page
    }
    if (this.searchPhrase !== undefined && this.searchPhrase !== '') {
      queryParams.phrase = this.searchPhrase;
    }
    if (this.searchProducts.selectedCategories !== undefined && this.searchProducts.selectedCategories.length > 0) {
      queryParams.categories = this.searchProducts.selectedCategories;
    }
    this.loadingService.loadingOff();
    this.router.navigate(['/product/search'], { queryParams: queryParams });
  }

  getProducts() {
    this.loadingService.loadingOn();
    this.isDataLoaded = false;

    this.productService.searchProduct(this.searchProducts).subscribe((res) => {
      this.loadingService.loadingOn();

      this.title.setTitle(`جستجو محصولات | ${res.dataCount} نتیجه پیدا شد`)
      this.searchProducts = res;

      if (res.phrase === null) {
        this.searchProducts.phrase = '';
        this.searchPhrase = '';
      }

      this.pages = [];

      if (res.selectedCategories === null) {
        this.searchProducts.selectedCategories = [];
      }

      for (let i = 1; i < ((this.searchProducts.dataCount / this.searchProducts.takePage) + 1); i++) {
        this.pages.push(i);
      }

      if (res.products.length) {
        this.isDataLoaded = true;
      }
      this.loadingService.loadingOff();

    })

    this.loadingService.loadingOff();
  }

  filterCategories(event: any, catSlug: string) {
    this.loadingService.loadingOn();

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
    this.loadingService.loadingOn();

    if (this.searchProducts.selectedCategories.length > 0) {
      let queryParams: any = {
        categories: this.searchProducts.selectedCategories
      }
      if (this.searchPhrase !== undefined && this.searchPhrase !== '') {
        queryParams.phrase = this.searchPhrase;
      }
      this.router.navigate(['/product/search'], { queryParams: queryParams });
    } else {
      this.router.navigate(['/product/search']);
    }
    this.loadingService.loadingOff();

  }

  setCreationSort(sort: number) {
    this.loadingService.loadingOn();

    this.creationSort = sort;
    this.searchProducts.sortCreationDateOrder = sort;
    this.currentCreationSortSelected[0] = sort;
    if (sort == 0) {
      this.currentCreationSortSelected[1] = "جدیدترین";
    } if (sort == 1) {
      this.currentCreationSortSelected[1] = "قدیمی ترین";
    }
    this.getProducts();
  }

  setPriceOrder(sort: number) {
    this.loadingService.loadingOn();

    this.priceSort = sort;
    this.searchProducts.searchProductPriceOrder = sort;
    this.currentPriceSortSelected[0] = sort;
    if (sort == 0) {
      this.currentPriceSortSelected[1] = "همه";
    } if (sort == 1) {
      this.currentPriceSortSelected[1] = "قیمت از زیاد به کم";
    } if (sort == 2) {
      this.currentPriceSortSelected[1] = "قیمت از کم به زیاد";
    }
    this.getProducts();
  }

  priceValueChanged(event: any) {
    this.loadingService.loadingOn();

    this.searchProducts.selectedMinPrice = event.value;
    this.searchProducts.selectedMaxPrice = event.highValue;

    setTimeout(() => this.getProducts(), 200)
  }
}
