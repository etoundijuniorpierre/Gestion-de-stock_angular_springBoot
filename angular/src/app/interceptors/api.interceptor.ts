
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (isPlatformBrowser(platformId)) {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
  }

  // Ne pas modifier l'URL, laisser l'API générée gérer cela
  const modifiedRequest = req.clone({
    setHeaders: headers
  });
  
  if (isPlatformBrowser(platformId)) {
    console.log(`🚀 [API] ${req.method} ${req.url}`, {
      headers: modifiedRequest.headers,
      body: modifiedRequest.body
    });
  }
  
  return next(modifiedRequest).pipe(
    tap({
      next: (event) => {
        if (isPlatformBrowser(platformId)) {
          console.log(`✅ [API] ${req.method} ${req.url} - Succès`);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (isPlatformBrowser(platformId)) {
          console.error(`❌ [API] ${req.method} ${req.url} - Erreur:`, {
            status: error.status,
            message: error.message,
            error: error.error
          });
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (isPlatformBrowser(platformId)) {
          console.warn('🔐 [API] Token expiré ou invalide, redirection vers login');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userEmail');
        }
      }
      
      if (error.status >= 500) {
        console.error('🖥️ [API] Erreur serveur:', error);
      }
      
      return throwError(() => error);
    })
  );
};