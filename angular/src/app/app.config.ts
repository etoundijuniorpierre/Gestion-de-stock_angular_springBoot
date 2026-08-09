import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiInterceptor } from './interceptors/api.interceptor';
import { provideApi } from '../gs-api/src/provide-api';
import { GlobalErrorHandler } from './services/error/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideApi({ basePath: '' }), // Utiliser une chaîne vide pour que le proxy fonctionne correctement
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
