import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ButtonActionComponent {
  @Input() isNouveauVisible = true;
  @Input() isExporterVisible = true;
  @Input() isImporterVisible = true;
  @Input() text = 'Nouveau';
  @Input() icon = 'fas fa-plus';
  @Input() buttonClass = 'btn-primary';
  
  @Output() clickEvent = new EventEmitter<void>();
  @Output() nouveauClick = new EventEmitter<void>();
  @Output() exporterClick = new EventEmitter<void>();
  @Output() importerClick = new EventEmitter<void>();

  constructor(private router: Router) { }

  bouttonNouveauClick(): void {
    this.nouveauClick.emit();
    this.clickEvent.emit();
  }

  bouttonExporterClick(): void {
    this.exporterClick.emit();
  }

  bouttonImporterClick(): void {
    this.importerClick.emit();
  }
}

