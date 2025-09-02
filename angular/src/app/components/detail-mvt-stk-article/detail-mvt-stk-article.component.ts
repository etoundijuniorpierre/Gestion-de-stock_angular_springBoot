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
      
      // Here you would typically send the data to your backend
      // For now, we'll just log it and close the modal
      
      // Simulate API call
      setTimeout(() => {
        alert(`Correction de stock appliquée: ${this.correctionData.quantity} (${this.correctionData.type})`);
        this.closeCorrectionModal();
      }, 500);
    } else {
      alert('Veuillez remplir tous les champs');
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
}
