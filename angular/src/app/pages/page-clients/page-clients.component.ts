import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { DetailCltComponent } from '../../components/detail-clt/detail-clt.component';

@Component({
  selector: 'app-page-clients',
  templateUrl: './page-clients.component.html',
  styleUrls: ['./page-clients.component.scss'],
  standalone: true,
  imports: [CommonModule, DetailCltComponent]
})
export class PageClientsComponent implements OnInit {

  listClient: Array<any> = [];

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllClients();
  }

  findAllClients(): void {
    this.cltFrsService.findAllClients()
      .subscribe(clients => {
        this.listClient = clients;
      });
  }

  nouveauClient(): void {
    this.router.navigate(['dashboard', 'nouveauclient']);
  }

  modifierClient(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouveauclient', id]);
    }
  }

  handleSuppression(result: string): void {
    if (result === 'success') {
      this.findAllClients();
    }
  }
}