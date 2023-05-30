import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, TitleStrategy } from '@angular/router';
import { routes } from './app/app-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideClientHydration(),
    importProvidersFrom(
      RouterModule.forRoot(routes)
    ),
  ],
}).catch((err) => console.error(err));
