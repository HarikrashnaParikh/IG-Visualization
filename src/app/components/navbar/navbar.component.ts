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
    console.log(this.resourceData);
    
  }

  getPdIds() {
    this.graphService
      .getResource('planDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        // console.log(response)
        this.pdIds = this.planDefinition.map((item: any) => item.resource.id);
      });
  }

  getPlanDefinitionData(selectedId: string) {
    this.graphService
      .getResource('planDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        this.selectedPd = this.planDefinition.find((el: any) => el.resource.id === selectedId);
        // console.log('select pd====', this.selectedPd);
        this.actionSize = this.selectedPd.resource.action.length;        
        this.selectedPd.resource.action.forEach((data: any) => {
          this.adIds.push(data.definitionCanonical.split('/').slice(-1).pop());
        });
        // console.log('temp array ####', this.adIds);
        this.adIds.forEach((adId: any) => {
          this.getActivityDefinitionData(adId);
        });

        // console.log(this.adData);
      });
  }

  getActions(){
    this.actions = this.selectedPd.resource.action;
    console.log(this.actions);
    this.router.navigate(['actions']);
    
  }
  
  getActivityDefinitionData(selectedId: string) {
    this.graphService.getResource('ActivityDefinition').subscribe((response: any) => {
        this.ad = response;
        this.adData.push(
          this.ad.find((el: any) => el.resource.id === selectedId)
        );

      });
  }

  getLibraryData() {
    this.graphService.getResource('Library').subscribe((response: any) => {
      this.libraryData = response;
    });
  }

  getDeviceData() {
    this.graphService.getResource('Device').subscribe((response: any) => {
      this.deviceData = response;
    });
  }

  async getPdData() {
    const temp = this.selectedData;
    await this.getPlanDefinitionData(temp);
    this.getDeviceData();
    this.getLibraryData();

  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
