import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingDataSortCreationDateOrder } from '@app_models/_common/IPaging';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { SearchArticleModel } from '@app_models/blog/article/search-article';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ArticleService } from '@app_services/blog/article/article.service';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';

@Component({
  selector: 'search-article',
  templateUrl: './search-article.page.html'
})
export class SearchArticlePage implements OnInit {

  pages: number[] = [];
  baseArticlePath: string = environment.articleBaseImagePath + '/thumbnail/';
  articleCategories: ArticleCategoryModel[] = [];
  creationSort: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
  currentCreationSortSelected = [0, "جدیدترین"];

  searchPhrase: string = '';
  searchArticles: SearchArticleModel = new SearchArticleModel(this.searchPhrase, [], 0, 10, this.creationSort);

  isDataLoaded: boolean = false;
  constructor(
    private articleCategoryService: ArticleCategoryService,
    private articleService: ArticleService,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.title.setTitle("جستجو مقالات");
  }

  ngOnInit(): void {
    this.isDataLoaded = false;

    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;

      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.searchArticles.phrase = params.phrase;
      this.searchPhrase = params.phrase;

      let selectedCategoryParams: string[];

      if (typeof params?.categories === "string") {
        selectedCategoryParams = [params?.categories]
      } else if (typeof params?.categories === "object") {
        selectedCategoryParams = params?.categories
      }

      if (selectedCategoryParams !== null && selectedCategoryParams !== undefined && selectedCategoryParams.length) {
        this.searchArticles.selectedCategories = selectedCategoryParams;
      }

      this.searchArticles.pageId = pageId;
      this.getArticles();
    });

    this.articleCategoryService.getArticleCategoriesList().subscribe(res => this.articleCategories = res);

  }

  setPage(page: number) {
    let queryParams: any = {
      pageId: page
    }
    if (this.searchPhrase !== undefined && this.searchPhrase !== '') {
      queryParams.phrase = this.searchPhrase;
    }
    if (this.searchArticles.selectedCategories !== undefined && this.searchArticles.selectedCategories.length > 0) {
      queryParams.categories = this.searchArticles.selectedCategories;
    }
    this.router.navigate(['/blog'], { queryParams: queryParams });
  }

  getArticles() {
    this.isDataLoaded = false;

    this.articleService.searchArticle(this.searchArticles).subscribe((res) => {

      this.title.setTitle(`جستجو مقالات | ${res.dataCount} نتیجه پیدا شد`)
      this.searchArticles = res;

      if (res.phrase === null) {
        this.searchArticles.phrase = '';
        this.searchPhrase = '';
      }

      this.pages = [];

      if (res.selectedCategories === null) {
        this.searchArticles.selectedCategories = [];
      }

      for (let i = 1; i < ((this.searchArticles.dataCount / this.searchArticles.takePage) + 1); i++) {
        this.pages.push(i);
      }

      if (res.articles.length) {
        this.isDataLoaded = true;
      }
    })
  }

  filterCategories(event: any, catSlug: string) {

    if (this.searchArticles.selectedCategories === undefined || this.searchArticles.selectedCategories === null) {
      this.searchArticles.selectedCategories = [];
    }

    if (event.target.checked) {
      this.searchArticles.selectedCategories.push(catSlug);
      this.setFilterCategories();
    } else {
      this.searchArticles.selectedCategories = this.searchArticles.selectedCategories.filter(s => s !== catSlug);
      this.setFilterCategories();
    }
  }

  setFilterCategories() {
    if (this.searchArticles.selectedCategories.length > 0) {
      let queryParams: any = {
        categories: this.searchArticles.selectedCategories
      }
      if (this.searchPhrase !== undefined && this.searchPhrase !== '') {
        queryParams.phrase = this.searchPhrase;
      }
      this.router.navigate(['/blog'], { queryParams: queryParams });
    } else {
      this.router.navigate(['/blog']);
    }
  }

  setCreationSort(sort: number) {
    this.creationSort = sort;
    this.searchArticles.sortCreationDateOrder = sort;
    this.currentCreationSortSelected[0] = sort;
    if (sort == 0) {
      this.currentCreationSortSelected[1] = "جدیدترین";
    } if (sort == 1) {
      this.currentCreationSortSelected[1] = "قدیمی ترین";
    }
    this.getArticles();
  }
}
