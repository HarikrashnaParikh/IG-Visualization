import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphServiceService } from '../graph-service.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  // styleUrls: ['./navbar.component.css'],
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
  }
  getPdIds() {
    this.graphService
      .getResource('PlanDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        this.pdIds = this.planDefinition.map((item: any) => item.resource.id);
      });
  }

  getPlanDefinitionData(selectedId: string) {
    this.graphService
      .getResource('PlanDefinition')
      .subscribe((response: any) => {
        this.planDefinition = response;
        this.selectedPd = this.planDefinition.find((el: any) => el.resource.id === selectedId);
        console.log('select pd====', this.selectedPd);
        this.actionSize = this.selectedPd.resource.action.length;        
        this.selectedPd.resource.action.forEach((data: any) => {
          this.adIds.push(data.definitionCanonical.split('/').slice(-1).pop());
        });
        console.log('temp array ####', this.adIds);
        this.adIds.forEach((adId: any) => {
          this.getActivityDefinitionData(adId);
        });

        console.log(this.adData);

        // const adData = (tempData as any[]).map((data: any)=>data.resource.action).map((obj: string)=>obj.split('/').slice(-1).pop());
        // console.log("herrrrr====",adData);

        // const data = (this.planDefinition as any[]).map((object)=>object.resource.action)
        // .reduce((acc,curr)=>{
        //   return [...acc,...curr.map((action: { definitionCanonical: any; })=>action.definitionCanonical)]
        // },[]).map((obj: string)=>obj.split('/').slice(-1).pop())
        // console.log(data)

        // console.log("here is pd===",this.planDefinition);
        // console.log("=====wkfbsdkvb=====",this.pdIds);
      });
  }
  getActivityDefinitionData(selectedId: string) {
    this.graphService.getResource('ActivityDefinition').subscribe((response: any) => {
        this.ad = response;
        this.adData.push(
          this.ad.find((el: any) => el.resource.id === selectedId)
        );

        // const tempAd = this.ad.find((el: any) => el.resource.id === temp);
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

    // console.log("ddytdytdytd",temp);
    // console.log("============",tempData);
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
