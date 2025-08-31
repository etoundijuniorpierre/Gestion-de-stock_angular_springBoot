import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientDto, AdresseDto } from '../../api/interfaces/client.interface';
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
          this.adresseDto = client['adresse'] || {};
        });
    }
  }

  enregistrer(): void {
    // Validation des champs obligatoires
    if (!this.client.nom || !this.client.prenom || !this.client.email) {
      this.errorMsg = ['Les champs nom, prénom et email sont obligatoires'];
      return;
    }

    // Mapper l'adresse
    this.client.adresse = this.adresseDto;

    if (this.isEditMode) {
      // Mode édition
      this.cltFrsService.updateClient(this.client['id']!, this.client)
        .subscribe((client: ClientDto) => {
          this.savePhoto(client['id'], client['nom']);
        }, (error: any) => {
          this.errorMsg = error.error?.errors || ['Erreur lors de la mise à jour'];
        });
    } else {
      // Mode création
      this.cltFrsService.saveClient(this.client)
        .subscribe((client: ClientDto) => {
          this.savePhoto(client['id'], client['nom']);
        }, (error: any) => {
          this.errorMsg = error.error?.errors || ['Erreur lors de la sauvegarde'];
        });
    }
  }

  cancelClick(): void {
    this.router.navigate(['clients']);
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
      this.photoService.savePhoto(params)
        .subscribe((res: any) => {
          this.cancelClick();
        });
    } else {
      this.cancelClick();
    }
  }
}