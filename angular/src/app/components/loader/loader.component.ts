import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// Interface simplifiée pour le développement
interface LoaderState {
  show: boolean;
}

// Service simplifié pour le développement
class LoaderService {
  loaderState = {
    subscribe: (callback: (state: LoaderState) => void) => {
      // Simulation pour le développement
      return {
        unsubscribe: () => {}
      } as Subscription;
    }
  };
}

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  subscription: Subscription | undefined;
  private loaderService = new LoaderService();

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}