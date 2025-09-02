import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationRequest, AuthenticationResponse } from '../../gs-api/src/model/models';
import { AuthentificationService } from '../../gs-api/src/api/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authentificationService: AuthentificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if user is already logged in on app initialization
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const isLoggedIn = !!token;
      this.isAuthenticatedSubject.next(isLoggedIn);
    } else {
      // Server-side rendering - assume not authenticated
      this.isAuthenticatedSubject.next(false);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    if (!email || !password) {
      return of(false);
    }

    const authRequest: AuthenticationRequest = {
      login: email,
      password: password
    };

    // Utiliser l'API générée
    return this.authentificationService.authenticate(authRequest).pipe(
      tap((response: AuthenticationResponse) => {
        if (response.accessToken) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.accessToken);
            localStorage.setItem('userEmail', email);
          }
          this.isAuthenticatedSubject.next(true);
        }
      }),
      map((response: AuthenticationResponse) => !!response.accessToken),
      catchError((error) => {
        console.error('Erreur d\'authentification:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    }
    
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getUserEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userEmail') || 'Utilisateur';
    }
    return 'Utilisateur';
  }
} 