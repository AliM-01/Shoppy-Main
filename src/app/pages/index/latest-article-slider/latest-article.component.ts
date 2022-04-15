import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '@app_models/blog/article/article';
import { ArticleService } from '@app_services/blog/article/article.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'index-latest-articles',
  templateUrl: './latest-article.component.html'
})
export class LatestArticleComponent implements OnInit {

  articlesSubject: BehaviorSubject<ArticleModel[]> = new BehaviorSubject<ArticleModel[]>([]);
  articles$: Observable<ArticleModel[]> = this.articlesSubject.asObservable();

  baseArticlePath: string = environment.articleBaseImagePath + '/thumbnail/';

  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 4, "dots": true,
    "fade": false, "loop": true, "arrows": true, "responsive": [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {

    this.articleService.getLatestArticles().subscribe(res => this.articlesSubject.next(res))
  }
}
