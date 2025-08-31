import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { FournisseurDto } from '../../api/interfaces/client.interface';

@Component({
  selector: 'app-detail-frs',
  templateUrl: './detail-frs.component.html',
  styleUrls: ['./detail-frs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailFrsComponent implements OnInit {
  @Input() fournisseur: FournisseurDto = {};
  @Output() suppressionResult = new EventEmitter<string>();

  constructor(private router: Router, private cltFrsService: CltfrsService) { }
  ngOnInit(): void { }

  modifierFournisseur(): void {
    if (this.fournisseur.id) {
      this.router.navigate(['dashboard', 'nouveaufournisseur', this.fournisseur.id]);
    }
  }

  confirmerEtSupprimer(): void {
    if (this.fournisseur.id) {
      this.cltFrsService.deleteFournisseur(this.fournisseur.id)
        .subscribe(res => { this.suppressionResult.emit('success'); },
                   error => { this.suppressionResult.emit(error.error?.error || 'Erreur lors de la suppression'); });
    }
  }
}