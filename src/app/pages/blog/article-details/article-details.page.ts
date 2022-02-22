import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { ArticleService } from '@app_services/blog/article/article.service';
import { ArticleDetailsModel } from '../../../_models/blog/article/article-details';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.page.html'
})
export class ArticleDetailsPage implements OnInit {

  article!: ArticleDetailsModel;
  private pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  pageTitle$: Observable<string> = this.pageTitleSubject.asObservable();
  isDataLoaded: boolean = false;
  baseArticleImgPath: string = environment.productPictureBaseImagePath + '/original/';

  constructor(
    private articleService: ArticleService,
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

  }

  getArticle(slug:string) {
    this.articleService.getArticleDetails(slug)
    .subscribe((res) => {
      if (res.status === 'success') {
        this.pageTitleSubject.next(res.data.title)
        this.article = res.data;

        this.setMetaTags(res.data)

        this.isDataLoaded = true;
      }
    },
    () => this._location.back()
  );
  }

  setMetaTags(data: ArticleDetailsModel){
    this.title.setTitle(data.title);
    this.meta.addTags([
      { name: 'keywords', content: data.metaKeywords },
      { name: 'robots', content: 'index, follow' }, 
      { name: 'author', content: 'shoppy'},
      { name: 'description', content: data.metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8'}
    ]);
  }
}