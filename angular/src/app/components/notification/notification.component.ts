import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, AppNotification } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  trackById(_index: number, item: AppNotification): number {
    return item.id;
  }

  cssClass(type: AppNotification['type']): string {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-danger';
      case 'warning': return 'alert-warning';
      default: return 'alert-info';
    }
  }

  icon(type: AppNotification['type']): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-triangle';
      case 'warning': return 'fas fa-exclamation-circle';
      default: return 'fas fa-info-circle';
    }
  }
}
