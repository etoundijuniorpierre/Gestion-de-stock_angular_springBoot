import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-action',
  imports: [CommonModule, RouterModule],
  templateUrl: './button-action.component.html',
  styleUrl: './button-action.component.scss',
  standalone: true
})
export class ButtonActionComponent {
  @Input()
  isNouveauVisible = true;
  @Input()
  isExporterVisible = true;
  @Input()
  isImporterVisible = true;

  @Output()
  clickEvent = new EventEmitter();

  constructor(private router: Router) { }

  bouttonNouveauClick(): void {
    this.clickEvent.emit();
  }
}

