import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { CartService } from '@app_services/cart/cart.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { environment } from '@environments/environment';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ArticleCategoryService, ProductCategoryService, CartService]
})
export class HeaderComponent implements OnInit {

  cartItems: CartItemCookieModel[] = [];
  cartCount = 0;
  cartPrice = 0;

  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  productCategories: ProductCategoryModel[] = [];
  articleCategories: ArticleCategoryModel[] = [];

  searchPhrase: string = '';
  selectedCategory: string = '';
  constructor(
    private productCategoryService: ProductCategoryService,
    private articleCategoryService: ArticleCategoryService,
    private msg: MessengerService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductCategoriesList();
    this.getArticleCategoriesList();
    this.handleCartChanges();
  }

  private getProductCategoriesList(): void {
    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === "success") {
        this.productCategories = res.data;
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

  handleCartChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      console.log('header changeee');

      this.loadCartItems();
    })
  }

  loadCartItems() {
    const items: CartItemCookieModel[] = this.cartService.getCartItems()
    console.log('header load res', items);

    this.cartItems = items;
    this.cartCount = this.cartService.getCartItemsCount();
    this.cartPrice = this.cartService.itemsTotalPrice
  }

  removeItem(id: string) {
    this.cartService.removeItem(id);
    this.msg.sendMsg("remove item");
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
