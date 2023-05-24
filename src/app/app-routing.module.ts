import { Routes } from '@angular/router';
import { PathRoutes, routesDetails } from './core/constants/routes';

export const routes: Routes = [
  {
    path: routesDetails[PathRoutes.Home].url,
    title: routesDetails[PathRoutes.Home].title,
    loadComponent: () =>
      import('./features/article/pages/list/article-list.component').then(
        (m) => m.ArticleListComponent
      ),
  },
  {
    path: routesDetails[PathRoutes.ArticleDetails].url,
    title: routesDetails[PathRoutes.ArticleDetails].title,
    loadComponent: () =>
      import('./features/article/pages/details/article-details.component').then(
        (m) => m.ArticleDetailsComponent
      ),
  },
  {
    path: routesDetails[PathRoutes.Dashboard].url,
    title: routesDetails[PathRoutes.Dashboard].title,
    loadComponent: () =>
      import('./features/admin/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
