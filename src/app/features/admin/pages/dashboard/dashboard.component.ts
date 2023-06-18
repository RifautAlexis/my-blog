import {
  Component,
  Injector,
  OnInit,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardTableComponent } from '../../components/dashboard-table/dashboard-table.component';
import { DashboardFilterComponent } from '../../components/dashboard-filter/dashboard-filter.component';
import { AdminService } from '../../services/admin.service';
import { MatButtonModule } from '@angular/material/button';
import { PathRoutes } from 'src/app/core/constants/routes';
import { getRouteUrl, replaceParams } from 'src/app/core/utils/route';
import { Router } from '@angular/router';
import { eventNavigation } from '../../models/event-navigation';

@Component({
  selector: 'dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    DashboardTableComponent,
    DashboardFilterComponent,
    MatButtonModule,
  ],
})
export class DashboardComponent implements OnInit {
  articles: WritableSignal<Article[]> = signal<Article[]>([]);

  private adminService = inject(AdminService);
  private router = inject(Router);

  ngOnInit() {
    this.adminService.init();
    this.articles = this.adminService.articles;
  }

  onSearchedTerm(searchedTerm: string | null): void {
    if (!!!searchedTerm || searchedTerm === ' ') {
      this.adminService.resetSearch();
      return;
    }

    this.articles.set(
      this.articles().filter(
        (article) =>
          article.title.toLowerCase().includes(searchedTerm?.toLowerCase()) ||
          article.author.toLowerCase().includes(searchedTerm?.toLowerCase()) ||
          article.createdAt.toString().includes(searchedTerm?.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchedTerm?.toLowerCase())
          )
      )
    );
  }

  onDeleteItem(popo: any): void {
    console.log(popo);
  }

  navigate(params: eventNavigation): void {
    if (PathRoutes.ArticleDetails | PathRoutes.ArticleEdition) {
      const articleTitle: string = this.articles().find(article => article.id === params.articleId)!.title;
      const urlFormatted = replaceParams(getRouteUrl(params.route), [
        articleTitle!.replaceAll(' ', '-'),
      ]);
      this.router.navigate([urlFormatted], { state: { id: params.articleId } });
    }
  }
}
