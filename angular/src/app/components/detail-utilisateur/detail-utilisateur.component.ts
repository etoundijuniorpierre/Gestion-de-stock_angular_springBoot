import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailUtilisateurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}