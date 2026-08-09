import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AppNotification {
  id: number;
  type: NotificationType;
  message: string;
}

/**
 * Service de notifications centralisé (parité avec le hook React `useErrorHandler`
 * + le composant `ErrorHandler`). Toute la couche UI peut publier une erreur ou un
 * succès sans réimplémenter sa propre gestion locale.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private counter = 0;
  private readonly _notifications = new BehaviorSubject<AppNotification[]>([]);
  readonly notifications$: Observable<AppNotification[]> = this._notifications.asObservable();

  private push(type: NotificationType, message: string, autoCloseMs: number): number {
    if (!message) {
      return -1;
    }
    const id = ++this.counter;
    this._notifications.next([...this._notifications.value, { id, type, message }]);
    if (autoCloseMs > 0 && typeof setTimeout !== 'undefined') {
      setTimeout(() => this.dismiss(id), autoCloseMs);
    }
    return id;
  }

  showSuccess(message: string, autoCloseMs = 4000): number {
    return this.push('success', message, autoCloseMs);
  }

  showError(message: string, autoCloseMs = 6000): number {
    return this.push('error', message, autoCloseMs);
  }

  showWarning(message: string, autoCloseMs = 6000): number {
    return this.push('warning', message, autoCloseMs);
  }

  showInfo(message: string, autoCloseMs = 5000): number {
    return this.push('info', message, autoCloseMs);
  }

  dismiss(id: number): void {
    this._notifications.next(this._notifications.value.filter(n => n.id !== id));
  }

  clear(): void {
    this._notifications.next([]);
  }
}
