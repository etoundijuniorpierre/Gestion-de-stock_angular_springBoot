import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  connectedUser: any = null;
  searchTerm: string = '';
  private searchSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to search term changes
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });

    // Get connected user from localStorage
    this.connectedUser = this.authService.getUser();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  onSearchTermChange(event: any): void {
    this.searchService.setSearchTerm(event.target.value);
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleProfileClick(): void {
    this.router.navigate(['/dashboard', 'profil']);
  }

  // Fonction pour obtenir la photo de l'utilisateur ou la photo par défaut
  getUserPhoto(): string {
    if (this.connectedUser?.photo && this.connectedUser.photo !== null && this.connectedUser.photo !== '') {
      return this.connectedUser.photo;
    }
    return 'assets/react.ico'; // Photo par défaut si pas de photo
  }

  onImageError(event: any): void {
    event.target.src = 'assets/react.ico';
  }
}
