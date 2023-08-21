import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphServiceService } from 'src/app/services/graphService/graph-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  planDefinition: any = [];
  pdIds!: string[];
  selectedData!: string;
  selectedPd!: any;
  adIds: string[] = [];
  adData: any[] = [];
  actionSize !: number;
  actions: any = [];
  libraryData = [];
  deviceData = [];
  ad: any = [];
  questionnaire: any = [];
  structureMap: any = [];
  structureDefinition: any = [];
  library: any = [];
  valueSet: any = [];
  code: any = [];
  fileName!: string;
  nameWithoutExtension!: string;
  capitalizedFirstName!: string;
  resourceName!: string;
  pdId!: string;
  allResource: any = [];
  resourceData: any = [];
  resourceDataLength: any = [];
  currentPlanDefiniton: any;
  constructor(
    private router: Router,
    private graphService: GraphServiceService
  ) {}

  ngOnInit() {
    this.prerequisite();
  }

  prerequisite() {
    this.fileName = localStorage.getItem('fileName')!;
    this.nameWithoutExtension = this.fileName.split('.')[0];
    this.capitalizedFirstName =
      this.nameWithoutExtension.charAt(0).toUpperCase() +
      this.nameWithoutExtension.slice(1);
    this.getPdIds();
    this.getResourcesData();

  }

  getResourcesData(){
    this.graphService.getAllResourcesWithCount().subscribe((response: any) => {
        this.resourceData = response;
    });  
  }

  getPdIds() {
    this.graphService
      .getResource('planDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        this.pdIds = this.planDefinition.map((item: any) => item.resource.id);
        if (this.pdIds.length > 0) {
          this.selectedData = this.pdIds[0]; // Set the first item as default
          this.getPlanDefinitionData(this.selectedData);
          this.currentPlanDefiniton = this.planDefinition.find((planDefinition: any) => planDefinition.resource.id == this.selectedData);
          this.graphService.setSelectedPlanDefinition(this.currentPlanDefiniton);
        }
      });
  }

  getPlanDefinitionData(selectedId: string) {
    
    this.graphService
      .getResource('planDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        this.selectedPd = this.planDefinition.find((el: any) => el.resource.id === selectedId);
        this.actionSize = this.selectedPd.resource.action.length;        
      });
  }

  getActions(){
    this.actions = this.selectedPd.resource.action;
    this.router.navigate(['actions']);
    
  }
  
  getPdData() {
    const temp = this.selectedData;    
    this.getPlanDefinitionData(temp);

    this.currentPlanDefiniton = this.planDefinition.find((planDefinition: any) => planDefinition.resource.id == temp);
    this.graphService.setSelectedPlanDefinition(this.currentPlanDefiniton);
    
  }

  backToHome() {
    this.graphService.setSelectedPlanDefinition(null);
    this.router.navigate(['home']);
  }
}
