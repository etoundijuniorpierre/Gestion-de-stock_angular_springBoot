import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {
    this.userEmail = this.authService.getUserEmail();
  }

  logout(): void {
    this.authService.logout();
  }
}
