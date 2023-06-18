export enum PathRoutes {
  Home,
  ArticleDetails,
  Dashboard,
  ArticleCreation,
  ArticleEdition,
}

export const routesDetails: Record<PathRoutes, { url: string; title: string }> =
  {
    [PathRoutes.Home]: { url: '', title: 'Home' },
    [PathRoutes.ArticleDetails]: {
      url: 'article/:title',
      title: 'ArticleDetails',
    },
    [PathRoutes.Dashboard]: {
      url: 'admin/dashboard',
      title: 'Admin Dashboard',
    },
    [PathRoutes.ArticleCreation]: {
      url: 'admin/new-article',
      title: 'Article Creation',
    },
    [PathRoutes.ArticleEdition]: {
      url: 'admin/edit-article/:title',
      title: 'Article Edition',
    },
  };
