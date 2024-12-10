import { Component, OnInit } from '@angular/core';
import { WizardHeaderComponent } from '../../components/wizard-header/wizard-header.component';
import { DataLoadComponent } from '../data-load/data-load.component';
import { Router } from '@angular/router';
import { CommonModule, NgSwitch, NgSwitchDefault } from '@angular/common';
import { UserManagementComponent } from '../user-management/user-management.component';
import { ProfilesComponent } from '../profiles/profiles.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RulesComponent } from '../rules/rules.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    WizardHeaderComponent,
    DashboardComponent,
    DataLoadComponent,
    UserManagementComponent,
    ProfilesComponent,
    RulesComponent,
    NgSwitch,
    NgSwitchDefault
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css'
})
export class LayoutMainComponent implements OnInit {
  
  public route: string = '';
  public role: string = '';

  constructor(
    private router: Router
    ) {
    this.route = this._getUrlComponent();
  }

  ngOnInit(): void {}

  private _getUrlComponent(): string {
    let route = (this.router.url.split('/')[1]);
    return route;
  }

}
