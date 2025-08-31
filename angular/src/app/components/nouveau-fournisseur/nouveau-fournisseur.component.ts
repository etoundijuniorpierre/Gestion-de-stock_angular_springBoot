import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FournisseurDto, AdresseDto } from '../../api/interfaces/client.interface';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-nouveau-fournisseur',
  templateUrl: './nouveau-fournisseur.component.html',
  styleUrls: ['./nouveau-fournisseur.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouveauFournisseurComponent implements OnInit {

  fournisseur: FournisseurDto = {};
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
      this.cltFrsService.findFournisseurById(id)
        .subscribe((fournisseur: FournisseurDto) => {
          this.fournisseur = fournisseur;
          this.adresseDto = fournisseur['adresse'] || {};
        });
    }
  }

  enregistrer(): void {
    // Validation des champs obligatoires
    if (!this.fournisseur.nom || !this.fournisseur.prenom || !this.fournisseur.email) {
      this.errorMsg = ['Les champs nom, prénom et email sont obligatoires'];
      return;
    }

    // Mapper l'adresse
    this.fournisseur.adresse = this.adresseDto;

    if (this.isEditMode) {
      // Mode édition
      this.cltFrsService.updateFournisseur(this.fournisseur['id']!, this.fournisseur)
        .subscribe((fournisseur: FournisseurDto) => {
          this.savePhoto(fournisseur['id'], fournisseur['nom']);
        }, (error: any) => {
          this.errorMsg = error.error?.errors || ['Erreur lors de la mise à jour'];
        });
    } else {
      // Mode création
      this.cltFrsService.saveFournisseur(this.fournisseur)
        .subscribe((fournisseur: FournisseurDto) => {
          this.savePhoto(fournisseur['id'], fournisseur['nom']);
        }, (error: any) => {
          this.errorMsg = error.error?.errors || ['Erreur lors de la sauvegarde'];
        });
    }
  }

  cancelClick(): void {
    this.router.navigate(['fournisseurs']);
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
        context: 'fournisseur'
      };
      this.photoService.savePhoto(params)
        .subscribe((res: any) => {
          this.cancelClick();
        });
    } else {
      this.cancelClick();
    }
  }
}