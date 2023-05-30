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

@Component({
  selector: 'dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, DashboardTableComponent, DashboardFilterComponent],
})
export class DashboardComponent implements OnInit {
  articles: WritableSignal<Article[]> = signal<Article[]>([]);
  
  private adminService = inject(AdminService);

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
}
