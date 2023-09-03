import {
  Injectable,
  Injector,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

export enum Status {
  Success,
  Loading,
  Error,
}

export interface State<T> {
  status: Status;
  result: T;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private articleService = inject(ArticleService);

  initialData: State<Article[]> = {status: Status.Loading, result: []};
  articles: WritableSignal<State<Article[]>> = signal<State<Article[]>>(this.initialData);

  init() {
    // this.articleService.getArticles().subscribe((data) => {
    //   this.initialData = data;
    //   this.articles.set(data);
    // });
    
    this.articleService.getArticles().subscribe({
      next(value) {
        var data: State<Article[]> = {status: Status.Success, result: value} as State<Article[]>;
        this.initialData = data;
        this.articles.set(data);
      },
      error(err) {
        var data: State<Article[]> = {status: Status.Error, result: []} as State<Article[]>;
        this.initialData = data;
        this.articles.set(data);
      },
    });
  }

  resetSearch() {
    this.articles.set(this.initialData);
  }

  addArticle(newArticle: Article) {
    this.articles.mutate((articles) => {
      articles.push(newArticle);
    });
  }

  deleteArticle(articleId: number) {
    this.articles.mutate((articles) => {
      articles = articles.filter((article) => article.id !== articleId);
    });
  }

  updateArticle(updatedArticle: Article) {
    this.articles.mutate((articles) => {
      const index = articles.findIndex((article) => article.id === article.id);
      articles[index] = updatedArticle;
    });
  }
}
