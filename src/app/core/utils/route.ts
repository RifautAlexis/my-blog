import { PathRoutes, routesDetails } from '../constants/routes';

export function replaceParams(
  routeUrl: string,
  replacementValues: string[]
): string {
  const routeParamPattern = /:[^/|$|\n]+/gm;
  const counter = routeUrl.match(routeParamPattern)?.length;

  if (counter === undefined || counter === 0) {
    return routeUrl;
  }

  if (counter !== replacementValues.length) {
    throw Error('Argument exception');
  }
  var cnt = 0;
  return routeUrl.replace(routeParamPattern, (matched) => {
    if (cnt === replacementValues.length) cnt = 0;
    return replacementValues[cnt++];
  });
}

export function getRouteUrl(route: PathRoutes): string {
  return routesDetails[route].url;
}
