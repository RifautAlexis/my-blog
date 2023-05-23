import {
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../../shared/services/article.service';
import { Article } from '../../../../shared/models/article';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'article-details',
  standalone: true,
  templateUrl: 'article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  articleId!: string;
  article: Signal<Article> = signal<Article>({} as Article);

  private injector: Injector = inject(Injector);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    console.log(Number(this.articleId), this.articleId);
    this.articleService.getArticleById(Number(this.articleId)).subscribe(data => {
        console.log(data);
    });
    this.article = toSignal(
      this.articleService.getArticleById(Number(this.articleId)),
      {
        initialValue: {} as Article,
        injector: this.injector,
      }
    );
  }
}
