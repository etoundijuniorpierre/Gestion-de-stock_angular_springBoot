import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { ClientDto } from '../../api/interfaces/client.interface';

@Component({
  selector: 'app-nouveau-client',
  templateUrl: './nouveau-client.component.html',
  styleUrls: ['./nouveau-client.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class NouveauClientComponent implements OnInit {
  
  client: ClientDto = {
    nom: '',
    prenom: '',
    numTel: '',
    email: '',
    codeFiscal: '',
    adresse: {
      adresse1: '',
      adresse2: '',
      ville: '',
      codePostale: '',
      pays: ''
    }
  };
  
  errorMsg = '';
  isEditMode = false;
  clientId?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cltFrsService: CltfrsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.clientId = +params['id'];
        this.loadClient(this.clientId);
      }
    });
  }

  loadClient(id: number): void {
    this.cltFrsService.findClientById(id).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        this.errorMsg = 'Erreur lors du chargement du client';
        console.error('Erreur:', error);
      }
    });
  }

  enregistrer(): void {
    if (this.isEditMode && this.clientId) {
      this.cltFrsService.updateClient(this.clientId, this.client).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'clients']);
        },
        error: (error) => {
          this.errorMsg = 'Erreur lors de la mise à jour du client';
          console.error('Erreur:', error);
        }
      });
    } else {
      this.cltFrsService.saveClient(this.client).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'clients']);
        },
        error: (error) => {
          this.errorMsg = 'Erreur lors de la sauvegarde du client';
          console.error('Erreur:', error);
        }
      });
    }
  }

  annuler(): void {
    this.router.navigate(['dashboard', 'clients']);
  }
}
