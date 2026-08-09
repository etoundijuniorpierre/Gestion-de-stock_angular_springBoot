import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor() { }

  /**
   * Définir le terme de recherche
   */
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  /**
   * Obtenir le terme de recherche actuel
   */
  getSearchTerm(): string {
    return this.searchTermSubject.value;
  }

  /**
   * Effacer le terme de recherche
   */
  clearSearch(): void {
    this.searchTermSubject.next('');
  }
}
