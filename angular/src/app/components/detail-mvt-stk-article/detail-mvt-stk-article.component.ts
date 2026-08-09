import { Component, Input, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleDto } from '../../../gs-api/src/model/models';
import { MouvementStockService } from '../../services/mouvement-stock/mouvement-stock.service';

@Component({
  selector: 'app-detail-mvt-stk-article',
  imports: [FormsModule, CommonModule],
  templateUrl: './detail-mvt-stk-article.component.html',
  styleUrl: './detail-mvt-stk-article.component.scss',
  standalone: true
})
export class DetailMvtStkArticleComponent {
  @Input() article: ArticleDto = {};
  @Input() stockActuel: number = 0;

  // Form data for stock correction
  correctionData = {
    quantity: '',
    type: 'positive'
  };

  // Modal state
  isModalOpen = false;
  errorMessage = '';

  constructor(private mouvementStockService: MouvementStockService) {}

  // Prevent body scroll when modal is open
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      event.preventDefault();
      this.closeCorrectionModal();
    }
  }

  // Prevent navigation when modal is open
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    if (this.isModalOpen) {
      event.preventDefault();
      event.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
      return event.returnValue;
    }
  }

  // Open modal
  openCorrectionModal(): void {
    this.isModalOpen = true;
    this.resetForm();
    this.disableBodyScroll();
  }

  // Close modal
  closeCorrectionModal(): void {
    this.isModalOpen = false;
    this.resetForm();
    this.enableBodyScroll();
  }

  // Disable body scroll when modal is open
  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  }

  // Enable body scroll when modal is closed
  private enableBodyScroll(): void {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  // Reset form data
  resetForm(): void {
    this.correctionData = {
      quantity: '',
      type: 'positive'
    };
  }

  // Handle form submission
  onSubmitCorrection(): void {
    if (this.correctionData.quantity && this.correctionData.type) {
      console.log('Stock correction submitted:', this.correctionData);
      
      // Send data to backend API
      const correctionPayload = {
        articleId: this.article.id,
        quantity: parseFloat(this.correctionData.quantity),
        type: this.correctionData.type,
        date: new Date().toISOString()
      };
      
      this.mouvementStockService.createMouvement(correctionPayload).subscribe({
        next: (response) => {
          console.log('Correction de stock réussie:', response);
          this.errorMessage = '';
          this.showSuccess(`Correction de stock appliquée: ${this.correctionData.quantity} (${this.correctionData.type})`);
          this.closeCorrectionModal();
          // Optionally emit event to refresh parent component
          // this.correctionSuccess.emit(response);
        },
        error: (error) => {
          console.error('Erreur lors de la correction de stock:', error);
          this.showError('Erreur lors de la correction de stock: ' + (error.message || 'Erreur inconnue'));
        }
      });
    } else {
      // Afficher un message d'erreur plus élégant
      this.showError('Veuillez remplir tous les champs obligatoires');
    }
  }

  // Validate quantity input
  validateQuantity(event: any): void {
    const value = event.target.value;
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.replace(/[^\d.]/g, '');
    }
  }

  // Handle modal backdrop click
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeCorrectionModal();
    }
  }

  // Prevent modal content clicks from closing modal
  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }

  // Show success message
  private showSuccess(message: string): void {
    // You could use a toast service here
    console.log('SUCCESS:', message);
    // For now, use a more elegant alert alternative
    if (typeof window !== 'undefined' && window.alert()) {
      // Create a temporary success notification
      const notification = document.createElement('div');
      notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
      notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
      notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);
    }
  }

  // Show error message
  private showError(message: string): void {
    console.error('ERROR:', message);
    // You could use a toast service here
    if (typeof window !== 'undefined' && window.alert()) {
      // Create a temporary error notification
      const notification = document.createElement('div');
      notification.className = 'alert alert-danger alert-dismissible fade show position-fixed';
      notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
      notification.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove after 8 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 8000);
    }
  }
}
