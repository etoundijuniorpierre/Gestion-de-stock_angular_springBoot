import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientDto, AdresseDto } from '../../../gs-api/src/model/models';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-nouveau-client',
  templateUrl: './nouveau-client.component.html',
  styleUrls: ['./nouveau-client.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouveauClientComponent implements OnInit {

  client: ClientDto = {};
  adresseDto: AdresseDto = {};
  errorMsg: Array<string> = [];
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/product.png';
  isEditMode = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltfrsService,
    private photoService: PhotosService
  ) { }

  ngOnInit(): void {
    this.findObject();
  }

  findObject(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.cltFrsService.findClientById(id)
        .subscribe((client: ClientDto) => {
          this.client = client;
          this.adresseDto = client.adresse || {};
        });
    }
  }

  enregistrer(): void {
    // Validation des champs obligatoires
    if (!this.client.nom || !this.client.prenom || !this.client.mail) {
      this.errorMsg = ['Les champs nom, prénom et email sont obligatoires'];
      return;
    }

    // Mapper l'adresse
    this.client.adresse = this.adresseDto;

    if (this.isEditMode) {
      // Mode édition - Méthode non implémentée dans l'API
      this.errorMsg = ['La fonctionnalité de modification n\'est pas encore disponible. Veuillez créer un nouveau client.'];
      return;
    } else {
      // Mode création
      this.cltFrsService.saveClient(this.client)
        .subscribe((client: ClientDto) => {
          this.savePhoto(client.id, client.nom);
        }, (error: any) => {
          this.errorMsg = error.error?.errors || ['Erreur lors de la sauvegarde'];
        });
    }
  }

  cancelClick(): void {
    this.router.navigate(['dashboard', 'clients']);
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  savePhoto(idObject?: number, titre?: string): void {
    if (idObject && titre && this.file) {
      const params: PhotosService.SavePhotoParams = {
        id: idObject,
        file: this.file,
        title: titre,
        context: 'client'
      };

      this.photoService.savePhoto(params).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'clients']);
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde de la photo:', error);
          this.router.navigate(['dashboard', 'clients']);
        }
      });
    } else {
      this.router.navigate(['dashboard', 'clients']);
    }
  }
}