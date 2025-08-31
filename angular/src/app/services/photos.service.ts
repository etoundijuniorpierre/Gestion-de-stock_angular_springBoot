import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  constructor() { }

  savePhoto(params: PhotosService.SavePhotoParams): Observable<any> {
    // Simulation de sauvegarde de photo
    console.log('Sauvegarde de photo:', params);
    
    // Retourner une réponse simulée
    return of({
      success: true,
      message: 'Photo sauvegardée avec succès',
      photoUrl: `assets/photos/${params.context}/${params.id}.jpg`
    });
  }

  deletePhoto(id: number, context: string): Observable<any> {
    // Simulation de suppression de photo
    console.log('Suppression de photo:', { id, context });
    
    return of({
      success: true,
      message: 'Photo supprimée avec succès'
    });
  }

  getPhotoUrl(id: number, context: string): string {
    // Retourner l'URL de la photo
    return `assets/photos/${context}/${id}.jpg`;
  }
}
