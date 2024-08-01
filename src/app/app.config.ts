import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from './services/translation-loader.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide:HTTP_INTERCEPTORS,
        useClass:TokenInterceptor,
        multi:true
    },
    MessageService,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslationLoader,
          deps: [HttpClient],
        },
      })
    ),
  ]
};
