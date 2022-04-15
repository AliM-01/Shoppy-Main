import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { ArticleService } from '@app_services/blog/article/article.service';
import { ArticleDetailsModel } from '@app_models/blog/article/article-details';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ArticleModel } from '../../../_models/blog/article/article';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.page.html'
})
export class ArticleDetailsPage implements OnInit {

  article!: ArticleDetailsModel;
  private pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  pageTitle$: Observable<string> = this.pageTitleSubject.asObservable();
  isDataLoaded: boolean = false;
  baseArticleImgPath: string = environment.productPictureBaseImagePath;

  articleCategories: ArticleCategoryModel[] = [];
  relatedArticles: ArticleModel[] = [];

  constructor(
    private articleService: ArticleService,
    private articleCategoryService: ArticleCategoryService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.activatedRoute.params.subscribe(params => {
      const slug = params.slug;

      if (slug !== undefined) {
        this.getArticle(slug);
      }

    });
    this.articleCategoryService.getArticleCategoriesList()
        .subscribe(res => this.articleCategories = res);
  }

  getArticle(slug: string) {
    this.articleService.getArticleDetails(slug)
      .subscribe((res) => {
        this.pageTitleSubject.next(res.title)
        this.article = res;

        this.setMetaTags(res)
        this.getRelated();

        this.isDataLoaded = true;
      },
        () => this._location.back()
      );
  }

  setMetaTags(data: ArticleDetailsModel) {
    this.title.setTitle(data.title);
    this.meta.addTags([
      { name: 'keywords', content: data.metaKeywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'shoppy' },
      { name: 'description', content: data.metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }

  getRelated() {
    this.articleService.getRelatedArticles(this.article.id)
      .subscribe(res => this.relatedArticles = res)
  }
}
