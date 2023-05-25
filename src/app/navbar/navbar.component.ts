import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  resources = [
    ' Plan Definition ',
    ' Actions ',
    ' Activity Definition',
    'Questionnaire',
    ' Structure Map',
    'Target from Structure Map',
    'structure Definition',
    'Library',
    'Value Set',
    'Code System',
  ];
}
