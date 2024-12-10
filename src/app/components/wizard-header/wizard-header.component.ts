import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-wizard-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './wizard-header.component.html',
  styleUrl: './wizard-header.component.css'
})
export class WizardHeaderComponent {

}
