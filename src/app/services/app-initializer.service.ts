import { APP_INITIALIZER, Provider } from '@angular/core';
import { ThemeService } from './theme.service';

export const AppInitializersProvider: Provider[] = [
    {
        provide: APP_INITIALIZER,
        useFactory: (themeService: ThemeService) => () => {
            return themeService.loadTheme();
        },
        deps: [ThemeService],
        multi: true,
    },
];
