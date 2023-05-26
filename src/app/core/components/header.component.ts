import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PathRoutes } from '../constants/routes';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { getRouteUrl } from '../utils/route';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatButtonModule],
})
export class HeaderComponent {
  PathRoutes = PathRoutes;

  constructor(private readonly router: Router) {}

  navigate(route: PathRoutes): void {
    this.router.navigate([getRouteUrl(route)]);
  }
}
