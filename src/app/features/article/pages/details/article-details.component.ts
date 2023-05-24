import {
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  articleId!: number;
  article: Signal<Article> = signal<Article>({} as Article);

  private injector: Injector = inject(Injector);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as { id: number };
    this.articleId = state.id;
  }

  ngOnInit(): void {
    this.article = toSignal(
      this.articleService.getArticleById(this.articleId),
      {
        initialValue: {} as Article,
        injector: this.injector,
      }
    );
  }
}
