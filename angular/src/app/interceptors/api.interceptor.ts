
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const notifications = inject(NotificationService);
  
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
      const isBrowser = isPlatformBrowser(platformId);

      // Ne jamais rediriger sur l'endpoint de login : un 401/403 y signifie
      // simplement de mauvais identifiants, géré par le composant de login.
      const isAuthEndpoint = req.url.includes('/authenticate');

      // Distinguer une vraie erreur d'authentification d'une erreur métier
      // renvoyée par le backend (message / errors / error) pour éviter une
      // déconnexion abusive (parité avec l'intercepteur React).
      const payload: any = error.error;
      const isBusinessError = !!payload && (payload.message || payload.errors || payload.error);

      if ((error.status === 401 || error.status === 403) && !isAuthEndpoint && !isBusinessError) {
        // Token expiré ou invalide : nettoyer la session et rediriger vers /login.
        if (isBrowser) {
          console.warn('🔐 [API] Session expirée ou non autorisée, redirection vers /login');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          if (!router.url.startsWith('/login')) {
            router.navigate(['/login']);
          }
        }
      } else if (error.status === 0) {
        // status 0 = requête bloquée (CORS) ou serveur injoignable (réseau).
        console.error('🌐 [API] Erreur réseau/CORS : impossible de joindre le serveur backend.');
        if (isBrowser) {
          notifications.showError('Impossible de joindre le serveur. Vérifiez votre connexion.');
        }
      } else if (error.status >= 500) {
        console.error('🖥️ [API] Erreur serveur:', error);
        if (isBrowser) {
          notifications.showError('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
        }
      }

      return throwError(() => error);
    })
  );
};