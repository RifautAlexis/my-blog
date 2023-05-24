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
import { PathRoutes, routesDetails } from 'src/app/core/constants/routes';
import { replaceParams } from 'src/app/core/utils/route';
import { ArticleService } from '../../../../shared/services/article.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../../../shared/models/article';

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

  navigate(route: PathRoutes, articleId: number, articleTitle: string): void {
    const routedetails = routesDetails[route];
    const urlFormatted = replaceParams(routedetails.url, [articleTitle.replaceAll(' ', '-')]);
    this.router.navigate([urlFormatted], {state: {id: articleId}});
  }
}
