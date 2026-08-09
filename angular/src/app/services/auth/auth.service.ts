import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthentificationService, AuthenticationRequest, AuthenticationResponse } from '../../../gs-api/src';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  login: string;
  accessToken: string;
  refreshToken?: string;
  nom?: string;
  email?: string;
  photo?: string;
  id?: number;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticated = false;

  constructor(
    private authentificationService: AuthentificationService,
    private http: HttpClient
  ) {
    // Vérifier s'il y a un token stocké au démarrage
    this.loadStoredUser();
    this.checkAuthStatus();
  }

  /**
   * Vérifier le statut d'authentification au démarrage
   */
  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  /**
   * Authentifier un utilisateur avec remember me functionality
   */
  login(login: string, password: string, rememberMe: boolean = false): Observable<AuthenticationResponse> {
    const authRequest: AuthenticationRequest = { login, password };
    
    return this.authentificationService.authenticate(authRequest).pipe(
      tap((response: AuthenticationResponse) => {
        if (response.accessToken) {
          const user: User = { 
            login, 
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            email: login
          };
          
          this.setCurrentUser(user);
          this.isAuthenticated = true;
          
          // Gérer le "Remember Me"
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', login);
            localStorage.setItem('rememberedPassword', password);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
            localStorage.removeItem('rememberMe');
          }
        }
      })
    );
  }

  /**
   * Déconnecter l'utilisateur - Enhanced version with backend logout
   */
  logout(): void {
    const token = this.getAccessToken();
    
    // Remove all auth-related items from localStorage first
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('id');
    localStorage.removeItem('idUser');
    localStorage.removeItem('entrepriseId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    
    this.currentUserSubject.next(null);
    this.isAuthenticated = false;
    
    // Only try to call logout endpoint if we have a token
    if (token) {
      this.http.post('/api/gestionDeStock/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: () => {
          console.log('✅ Backend logout endpoint called successfully');
        },
        error: (error) => {
          console.log('⚠️ Backend logout endpoint call failed (but localStorage cleaned):', error.message);
        }
      });
    }
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    // Always check the current state of localStorage, not just the cached value
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
    return this.isAuthenticated;
  }

  
  /**
   * Obtenir le token d'accès actuel
   */
  getAccessToken(): string | null {
    return localStorage.getItem('token') || this.currentUserSubject.value?.accessToken || null;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtenir les informations de l'utilisateur connecté depuis localStorage
   */
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Charger les données sauvegardées (remember me)
   */
  getRememberedCredentials(): { email: string; password: string; rememberMe: boolean } {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeStatus = localStorage.getItem('rememberMe') === 'true';
    
    return {
      email: savedEmail || '',
      password: savedPassword || '',
      rememberMe: rememberMeStatus
    };
  }

  /**
   * Vérifier si l'utilisateur doit changer son mot de passe
   */
  mustChangePassword(): boolean {
    return localStorage.getItem('mustChangePassword') === 'true';
  }

  /**
   * Définir l'utilisateur actuel
   */
  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', user.accessToken);
    if (user.refreshToken) {
      localStorage.setItem('refreshToken', user.refreshToken);
    }
    localStorage.setItem('user', JSON.stringify(user));
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
