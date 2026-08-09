import { Component } from '@angular/core';
import { PageTransitionComponent } from '../../components/page-transition/page-transition.component';
import { RouterOutlet } from '@angular/router';
import { SidebarNavComponent } from '../../components/sidebar-nav/sidebar-nav.component';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-page-dashboard',
  imports: [RouterOutlet, SidebarNavComponent, DashboardHeaderComponent, PageTransitionComponent, MenuComponent, HeaderComponent],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class PageDashboardComponent {
  
}
