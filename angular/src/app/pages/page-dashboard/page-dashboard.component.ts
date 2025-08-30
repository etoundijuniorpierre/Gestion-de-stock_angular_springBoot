import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-page-dashboard',
  imports: [RouterOutlet, MenuComponent, HeaderComponent],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.scss',
  standalone: true
})
export class PageDashboardComponent {
  
}
