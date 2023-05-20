import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathRoutes } from 'src/app/core/constants/routes';
import { replaceParams } from 'src/app/core/utils/route';
import { ArticleService } from '../article.service';

@Component({
  standalone: true,
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [CommonModule],
})
export class ArticleListComponent implements OnInit {
  title = 'my-blog';

  PathRoutes = PathRoutes;

  constructor(private readonly router: Router, private readonly articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => console.log(data));
  }

  navigate(route: PathRoutes, articleId: number): void {
    const urlFormatted = replaceParams(route, [articleId.toString()]);
    this.router.navigate([urlFormatted]);
  }
}
