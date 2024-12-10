import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutMainComponent } from './pages/layout-main/layout-main.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { DataLoadComponent } from './pages/data-load/data-load.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { RulesComponent } from './pages/rules/rules.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutMainComponent,
    UserManagementComponent,
    DataLoadComponent,
    ProfilesComponent,
    RulesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dataprox';
}
