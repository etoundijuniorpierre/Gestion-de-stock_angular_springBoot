import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Use the AuthService method which properly checks localStorage
    const authenticated = this.authService.isLoggedIn();
    
    if (!authenticated) {
      // Rediriger vers la page de connexion avec l'URL de retour
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifier si l'utilisateur doit changer son mot de passe
    const mustChangePassword = this.authService.mustChangePassword();
    const isChangingPassword = state.url.includes('changer-mot-passe');
    
    // Si l'utilisateur doit changer son mot de passe mais n'est pas sur la page de changement
    if (mustChangePassword && !isChangingPassword) {
      this.router.navigate(['/dashboard', 'changer-mot-passe']);
      return false;
    }

    return true;
  }
}
