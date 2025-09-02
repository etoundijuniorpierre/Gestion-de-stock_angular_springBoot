import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permettre l'accès si authentifié
    } else {
      // Rediriger vers login seulement si pas authentifié
      this.router.navigate(['/login']);
      return false;
    }
  }
}
