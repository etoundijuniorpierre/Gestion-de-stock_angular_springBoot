import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmationPopupComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmation';
  @Input() message = 'Êtes-vous sûr de vouloir effectuer cette action ?';
  @Input() confirmText = 'Confirmer';
  @Input() cancelText = 'Annuler';
  @Input() confirmButtonClass = 'btn-danger';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('confirmation-popup-overlay')) {
      this.onCancel();
    }
  }
}
