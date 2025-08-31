import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { ClientDto } from '../../api/interfaces/client.interface';

@Component({
  selector: 'app-detail-clt',
  templateUrl: './detail-clt.component.html',
  styleUrls: ['./detail-clt.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailCltComponent implements OnInit {
  @Input() client: ClientDto = {};
  @Output() suppressionResult = new EventEmitter<string>();

  constructor(private router: Router, private cltFrsService: CltfrsService) { }
  ngOnInit(): void { }

  modifierClient(): void {
    if (this.client.id) {
      this.router.navigate(['dashboard', 'nouveauclient', this.client.id]);
    }
  }

  confirmerEtSupprimer(): void {
    if (this.client.id) {
      this.cltFrsService.deleteClient(this.client.id)
        .subscribe(res => { this.suppressionResult.emit('success'); },
                   error => { this.suppressionResult.emit(error.error?.error || 'Erreur lors de la suppression'); });
    }
  }
}