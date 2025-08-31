import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { DetailFrsComponent } from '../../components/detail-frs/detail-frs.component';

@Component({
  selector: 'app-page-fournisseurs',
  templateUrl: './page-fournisseurs.component.html',
  styleUrls: ['./page-fournisseurs.component.scss'],
  standalone: true,
  imports: [CommonModule, DetailFrsComponent]
})
export class PageFournisseursComponent implements OnInit {

  listFournisseurs: Array<any> = [];

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllFournisseurs();
  }

  findAllFournisseurs(): void {
    this.cltFrsService.findAllFournisseurs()
      .subscribe(fournisseurs => {
        this.listFournisseurs = fournisseurs;
      });
  }

  nouveauFournisseur(): void {
    this.router.navigate(['dashboard', 'nouveaufournisseur']);
  }

  modifierFournisseur(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouveaufournisseur', id]);
    }
  }

  handleSuppression(result: string): void {
    if (result === 'success') {
      this.findAllFournisseurs();
    }
  }
}