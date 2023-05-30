import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  actions: any = [];
  ad: any = [];
  questionnaire: any = [];
  structureMap: any = [];
  structureDefinition: any = [];
  library: any = [];
  valueSet: any = [];
  code: any = [];
  constructor(
    private router: Router,
    private graphService: GraphServiceService
  ) {}

  ngOnInit() {

    this.graphService.getActions().subscribe((response: any) => {
      this.actions = response;
    });
    this.graphService.getActivityDefinition().subscribe((response: any) => {
      this.ad = response; // Handle the response
    });
    this.graphService.getQuestionnaire().subscribe((response: any) => {
      this.questionnaire = response; // Handle the response
    });
    this.graphService.getStructureMap().subscribe((response: any) => {
      this.structureMap = response; // Handle the response
    });
    this.graphService.getStructureDefinition().subscribe((response: any) => {
      this.structureDefinition = response; // Handle the response
    });
    this.graphService.getLibrary().subscribe((response: any) => {
      this.library = response; // Handle the response
    });
    this.graphService.getValueSet().subscribe((response: any) => {
      this.valueSet = response; // Handle the response
    });
    this.graphService.getCode().subscribe((response: any) => {
      this.code = response; // Handle the response
    });
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
