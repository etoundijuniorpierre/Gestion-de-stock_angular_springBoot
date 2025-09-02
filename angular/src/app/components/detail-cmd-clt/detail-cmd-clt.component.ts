import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { CommandeClientDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-detail-cmd-clt',
  templateUrl: './detail-cmd-clt.component.html',
  styleUrls: ['./detail-cmd-clt.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailCmdCltComponent implements OnInit {
  @Input() commande: CommandeClientDto = {};
  @Output() suppressionResult = new EventEmitter<string>();

  constructor(private router: Router, private cmdCltFrsService: CmdcltfrsService) { }
  
  ngOnInit(): void { }

  modifierCommande(): void {
    if (this.commande.id) {
      this.router.navigate(['dashboard', 'nouvellecommandeclt', this.commande.id]);
    }
  }

  confirmerEtSupprimer(): void {
    if (this.commande.id) {
      this.cmdCltFrsService.deleteCommandeClient(this.commande.id)
        .subscribe({
          next: (res) => { 
            this.suppressionResult.emit('success'); 
          },
          error: (error) => { 
            this.suppressionResult.emit(error.error?.error || 'Erreur lors de la suppression'); 
          }
        });
    }
  }
}
