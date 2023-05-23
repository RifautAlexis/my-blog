import { Routes } from '@angular/router';
import { PathRoutes } from './core/constants/routes';

export const routes: Routes = [
  {
    path: PathRoutes.Home,
    title: 'My Blog',
    loadComponent: () =>
      import('./features/article/pages/list/article-list.component').then(
        (m) => m.ArticleListComponent
      ),
  },
  {
    path: PathRoutes.ArticleDetails,
    title: 'My Article',
    loadComponent: () =>
      import('./features/article/pages/details/article-details.component').then(
        (m) => m.ArticleDetailsComponent
      ),
  },
  {
    path: PathRoutes.Dashboard,
    title: 'Admin Dashbaord',
    loadComponent: () =>
      import('./features/admin/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
