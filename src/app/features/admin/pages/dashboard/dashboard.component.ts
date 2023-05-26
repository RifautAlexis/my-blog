import {
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/models/article';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardTableComponent } from '../../components/dashboard-table/dashboard-table.component';
import { DashboardFilterComponent } from '../../components/dashboard-filter/dashboard-filter.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, DashboardTableComponent, DashboardFilterComponent],
})
export class DashboardComponent implements OnInit {
  articles: Signal<Article[]> = signal<Article[]>([]);

  private injector: Injector = inject(Injector);

  constructor(private readonly articleService: ArticleService) {}

  ngOnInit() {
    this.articles = toSignal(this.articleService.getArticles(), {
      initialValue: [],
      injector: this.injector,
    });
  }
}
