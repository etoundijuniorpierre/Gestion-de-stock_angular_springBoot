import { Component, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-transition',
  standalone: true,
  template: `
    <div class="page-transition-container">
      <div 
        class="page-content"
        [class.page-enter-active]="isEntering"
        [class.page-leave-active]="isLeaving">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './page-transition.component.scss'
})
export class PageTransitionComponent {
  @HostBinding('@class') hostClass = 'page-transition-host';
  
  isEntering = false;
  isLeaving = false;
  
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.resetAnimationState();
    });
  }
  
  private resetAnimationState(): void {
    setTimeout(() => {
      this.isEntering = true;
      setTimeout(() => {
        this.isEntering = false;
      }, 500);
    }, 50);
  }
  
  public startExitAnimation(): void {
    this.isLeaving = true;
  }
}
