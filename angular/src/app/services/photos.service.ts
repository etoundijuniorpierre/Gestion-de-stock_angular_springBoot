import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SavePhotoRequest } from '../../gs-api/src/model/models';
import { GestionDesPhotosService } from '../../gs-api/src/api/gestionDesPhotos.service';

export namespace PhotosService {
  export interface SavePhotoParams {
    id: number;
    file: File;
    title: string;
    context: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private gestionDesPhotosService: GestionDesPhotosService) { }

  savePhoto(params: PhotosService.SavePhotoParams): Observable<any> {
    // Convertir le File en Blob pour l'API
    const savePhotoRequest: SavePhotoRequest = {
      file: params.file
    };

    // L'API attend: savePhoto(context: string, id: number, title: string, savePhotoRequest?: SavePhotoRequest)
    return this.gestionDesPhotosService.savePhoto(
      params.context, 
      params.id, 
      params.title, 
      savePhotoRequest
    ).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la photo:', error);
        throw error; // Propager l'erreur au lieu de simuler
      })
    );
  }

  // Note: La méthode deletePhoto n'existe pas dans l'API générée
  // Elle devra être implémentée côté backend ou gérée différemment
  deletePhoto(id: number, context: string): Observable<any> {
    const error = new Error('Méthode deletePhoto non disponible dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  getPhotoUrl(id: number, context: string): string {
    // Retourner l'URL de la photo
    return `assets/photos/${context}/${id}.jpg`;
  }
}
