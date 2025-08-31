import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface simplifiée pour le développement
interface ChangerMotDePasseUtilisateurDto {
  id?: number;
  motDePasse?: string;
  confirmMotDePasse?: string;
}

// Service simplifié pour le développement
class UserService {
  getConnectedUser() {
    return { id: 1 };
  }
  
  changerMotDePasse(dto: ChangerMotDePasseUtilisateurDto) {
    return {
      subscribe: (callback: (data: any) => void) => {
        // Simulation pour le développement
        callback({});
        return {
          unsubscribe: () => {}
        };
      }
    };
  }
}

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-passe.component.html',
  styleUrls: ['./changer-mot-passe.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChangerMotDePasseComponent implements OnInit {

  changerMotDePasseDto: ChangerMotDePasseUtilisateurDto = {};
  ancienMotDePasse = '';
  private userService = new UserService();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('origin') && localStorage.getItem('origin') === 'inscription') {
      this.ancienMotDePasse = 'som3R@nd0mP@$$word';
      localStorage.removeItem('origin');
    }
  }

  cancel(): void {
    this.router.navigate(['profil']);
  }

  changerMotDePasseUtilisateur(): void {
    this.changerMotDePasseDto.id = this.userService.getConnectedUser().id;
    this.userService.changerMotDePasse(this.changerMotDePasseDto)
      .subscribe((data: any) => {
        // rien faire
        this.router.navigate(['profil']);
      });
  }
}
