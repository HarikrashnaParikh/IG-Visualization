import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private router: Router){}
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

  backToHome(){
    this.router.navigate(['home']);
  }
}
