import {
  Injectable,
  Injector,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private articleService = inject(ArticleService);

  articles: WritableSignal<Article[]> = signal<Article[]>([]);
  initialData: Article[] = [];

  init() {
    this.articleService.getArticles().subscribe((data) => {
      this.initialData = data;
      this.articles.set(data);
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
