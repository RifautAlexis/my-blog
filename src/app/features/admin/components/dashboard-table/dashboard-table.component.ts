import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChild, inject, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Article } from 'src/app/shared/models/article';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { PathRoutes } from 'src/app/core/constants/routes';
import { getRouteUrl, replaceParams } from 'src/app/core/utils/route';
import { Router } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { eventNavigation } from '../../models/event-navigation';

@Component({
  selector: 'dashboard-table',
  standalone: true,
  templateUrl: 'dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  imports: [MatTableModule, CommonModule, MatChipsModule, MatSortModule, MatIconModule, MatDialogModule],
})
export class DashboardTableComponent implements AfterViewInit {
  @Output() showDetails = new EventEmitter<eventNavigation>;
  @Output() editClicked = new EventEmitter<eventNavigation>;
  @Output() deleteClicked = new EventEmitter<number>;

  displayedColumns: string[] = ['title', 'tags', 'author', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource([] as Article[]);

  @ViewChild(MatSort) sort!: MatSort;

  PathRoutes = PathRoutes;

  _data: Article[] = [];
  @Input({ required: true })
  get data(): Article[] {
    return this._data;
  }
  set data(value: Article[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  
  router = inject(Router)

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  goToDetails(id: number) {
    this.showDetails.emit({route: PathRoutes.ArticleDetails, articleId: id});
  }

  editItem(id: number): void {
    this.editClicked.emit({route: PathRoutes.ArticleEdition, articleId: id});
  }

  deleteItem(id: number): void {
    this.deleteClicked.emit(id);
  }
}
