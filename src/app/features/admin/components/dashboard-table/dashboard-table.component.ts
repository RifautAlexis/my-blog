import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Article } from 'src/app/shared/models/article';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'dashboard-table',
  standalone: true,
  templateUrl: 'dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  imports: [MatTableModule, CommonModule, MatChipsModule, MatSortModule],
})
export class DashboardTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'tags', 'author', 'createdAt'];
  dataSource = new MatTableDataSource([] as Article[]);

  @ViewChild(MatSort) sort!: MatSort;

  _data: Article[] = [];
  @Input()
  get data(): Article[] {
    return this._data;
  }
  set data(value: Article[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
