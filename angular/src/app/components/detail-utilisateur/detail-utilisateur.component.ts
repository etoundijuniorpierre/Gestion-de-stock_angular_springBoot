import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailUtilisateurComponent implements OnInit {
  @Input() utilisateur: UtilisateurDto = {};

  constructor() { }

  ngOnInit(): void {
  }
}