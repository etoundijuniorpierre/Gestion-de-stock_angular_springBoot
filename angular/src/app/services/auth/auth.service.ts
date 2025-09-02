import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthentificationService, AuthenticationRequest, AuthenticationResponse } from '../../../gs-api/src';

export interface User {
  login: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private authentificationService: AuthentificationService) {
    // Vérifier s'il y a un token stocké au démarrage
    this.loadStoredUser();
  }

  /**
   * Authentifier un utilisateur
   */
  login(login: string, password: string): Observable<AuthenticationResponse> {
    const authRequest: AuthenticationRequest = { login, password };
    
    return this.authentificationService.authenticate(authRequest).pipe(
      tap((response: AuthenticationResponse) => {
        if (response.accessToken) {
          const user: User = { login, accessToken: response.accessToken };
          this.setCurrentUser(user);
        }
      })
    );
  }

  /**
   * Déconnecter l'utilisateur
   */
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Obtenir le token d'accès actuel
   */
  getAccessToken(): string | null {
    return this.currentUserSubject.value?.accessToken || null;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Définir l'utilisateur actuel
   */
  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Charger l'utilisateur stocké
   */
  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur stocké:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }
}
