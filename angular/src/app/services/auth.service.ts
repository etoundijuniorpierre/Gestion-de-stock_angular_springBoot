import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true); // Changé à true par défaut
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if user is already logged in on app initialization
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const isLoggedIn = !!token || true; // Considère comme connecté même sans token
      this.isAuthenticatedSubject.next(isLoggedIn);
    } else {
      // Server-side rendering - assume authenticated
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // Simulate API call - replace with actual authentication logic
    return new Promise((resolve) => {
      // For demo purposes, accept any non-empty credentials
      if (email && password) {
        if (isPlatformBrowser(this.platformId)) {
          // Store authentication token
          const token = 'demo-token-' + Date.now();
          localStorage.setItem('authToken', token);
          localStorage.setItem('userEmail', email);
        }
        
        this.isAuthenticatedSubject.next(true);
        resolve(true);
      } else {
        resolve(false);
      }
    });
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
      return localStorage.getItem('userEmail') || 'Utilisateur Demo';
    }
    return 'Utilisateur Demo';
  }
} 