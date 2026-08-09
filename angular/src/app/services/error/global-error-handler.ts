import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

/**
 * Gestionnaire d'erreurs global : capture les exceptions non gérées de
 * l'application et affiche un message utilisateur via le NotificationService
 * (parité avec la gestion d'erreurs centralisée de la version React).
 *
 * Les erreurs HTTP (HttpErrorResponse) sont déjà traitées par l'intercepteur
 * (redirection 401/403, messages 5xx/réseau) : on les ignore ici pour éviter
 * un double affichage.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    // Toujours tracer l'erreur complète en console pour le débogage.
    console.error('❌ [GlobalErrorHandler]', error);

    // Les erreurs HTTP sont gérées par l'intercepteur : ne pas re-notifier.
    const underlying = (error as { rejection?: unknown })?.rejection ?? error;
    if (underlying instanceof HttpErrorResponse) {
      return;
    }

    this.notificationService.showError(
      'Une erreur inattendue est survenue. Veuillez réessayer.'
    );
  }
}
