export enum PathRoutes {
  Home,
  ArticleDetails,
  Dashboard,
}


export const routesDetails: Record<PathRoutes, {url: string, title: string}> = {
  [PathRoutes.Home]: { url: '', title: 'Home' },
  [PathRoutes.ArticleDetails]: {
    url: "article/:title",
    title: "ArticleDetails"
  },
  [PathRoutes.Dashboard]: {
    url: "admin/dashboard",
    title: "Admin Dashboard"
  }
}; 