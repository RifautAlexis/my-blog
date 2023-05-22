import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { PathRoutes } from 'src/app/core/constants/routes';
import { replaceParams } from 'src/app/core/utils/route';
import { ArticleService } from '../article.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../models/article';

@Component({
  standalone: true,
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [CommonModule],
})
export class ArticleListComponent implements OnInit {
  articles: Signal<Article[]> = signal<Article[]>([]);

  private injector: Injector = inject(Injector);

  PathRoutes = PathRoutes;

  constructor(
    private readonly router: Router,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articles = toSignal(this.articleService.getArticles(), {
      initialValue: [],
      injector: this.injector,
    });
  }

  navigate(route: PathRoutes, articleId: number): void {
    const urlFormatted = replaceParams(route, [articleId.toString()]);
    this.router.navigate([urlFormatted]);
  }
}
