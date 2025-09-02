
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
    // Récupérer le token depuis currentUser (cohérent avec AuthService)
    const currentUserStr = localStorage.getItem('currentUser');
    console.log('🔍 [INTERCEPTOR] Token trouvé:', currentUserStr ? 'OUI' : 'NON');
    
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser.accessToken) {
          headers['Authorization'] = `Bearer ${currentUser.accessToken}`;
          console.log('🔑 [INTERCEPTOR] Token ajouté aux headers');
        } else {
          console.warn('⚠️ [INTERCEPTOR] Token manquant dans currentUser');
        }
      } catch (error) {
        console.error('❌ [INTERCEPTOR] Erreur lors du parsing du token:', error);
        localStorage.removeItem('currentUser');
      }
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
          console.log('🔍 [INTERCEPTOR] Suppression du token et redirection...');
          localStorage.removeItem('currentUser');
          // Ne pas rediriger automatiquement, laisser le composant gérer cela
        }
      }
      
      if (error.status >= 500) {
        console.error('🖥️ [API] Erreur serveur:', error);
      }
      
      return throwError(() => error);
    })
  );
};