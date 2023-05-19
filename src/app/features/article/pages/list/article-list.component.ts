import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathRoutes } from 'src/app/core/constants/routes';
import { replaceParams } from 'src/app/core/utils/route';

@Component({
  standalone: true,
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [CommonModule],
})
export class ArticleListComponent {
  title = 'my-blog';

  PathRoutes = PathRoutes;

  constructor(private readonly router: Router) {}

  navigate(route: PathRoutes, articleId: number): void {
    const urlFormatted = replaceParams(route, [articleId.toString()]);
    this.router.navigate([urlFormatted]);
  }
}
