import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from '@app_models/blog/article/article';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-article-box',
  templateUrl: './article-box.component.html'
})
export class ArticleBoxComponent implements OnInit {

  @Input() article: ArticleModel;
  baseArticlePath: string = environment.articleBaseImagePath + '/thumbnail/';

  constructor(
    ) { }

  ngOnInit(): void {
  }

}
