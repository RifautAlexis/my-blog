import { Injectable, signal } from '@angular/core';
import { ThemeType } from '../shared/models/enums/theme-type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal(ThemeType.Default);

  loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme();

    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }

    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.reverseTheme(theme));
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  toggleTheme(): Promise<Event> {
    this.currentTheme.set(this.reverseTheme(this.currentTheme()));
    return this.loadTheme(false);
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.Dark ? ThemeType.Default : ThemeType.Dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }
}
