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
  test = [{
    "name" : "Hari",
    "Ro" : 1
  },
  {
    "name" : "ABC",
    "Ro" : 123
  }
];
  data: any ;
  planDefinition: any = [];
  actions: any = [];
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
  pdId!: string ;
  allResource: any = [];
  resourceData:  any = [];
  resourceDataLength:  any = [];
  constructor(
    private router: Router,
    private graphService: GraphServiceService,
    ) {}
    
    ngOnInit() {
    this.fileName = sessionStorage.getItem("fileName")!;
    this.nameWithoutExtension = this.fileName.split(".")[0]; 
    this.capitalizedFirstName = this.nameWithoutExtension.charAt(0).toUpperCase() + this.nameWithoutExtension.slice(1);

    //GET all resource's name 
     this.graphService.getAllResources().subscribe({
      next: (res) => {
          this.allResource = res;
          console.log(this.allResource);
      },
      error: (error) => console.log(error),
      complete: () => {
        for(let i=0; i<this.allResource.length;i++){
          // console.log(i);
          
          // this.resourceName = this.allResource[i];
          // console.log("here is resourceNAme....."+this.resourceName);
          
          this.graphService.getResource(this.allResource[i]).subscribe((response: any)=>{
            this.data = response;          
            // console.log(this.allResource[i]+"==="+JSON.stringify(this.data));
            // console.log(this.data.length);
            this.resourceData[this.allResource[i]] = this.data; 
            // console.log(this.resourceData);
            // localStorage.setItem('pdIdDefault', this.data[0].resource.id);
            // console.log(localStorage.getItem('pdIdDefault'));
            this.resourceDataLength[this.allResource[i]] = this.data.length;
            // console.log(this.resourceDataLength);
            console.log(this.resourceDataLength);
          })
        }
        setTimeout(() => {console.log("final " +this.resourceDataLength);}, 10000);   
        console.log(this.resourceDataLength);       
      },
     })
     //Get data for Pd
    //  console.log("=====",JSON.stringify(this.resourceDataLength));
     
     
    // //PD 
    // await this.graphService.getResource(this.resourceName).subscribe((response: any)=>{
    //   this.planDefinition = response;
    //   localStorage.setItem('pdIdDefault', this.planDefinition[0].resource.id);
    // })

    // this.graphService.getActions(this.pdId).subscribe((response: any) => {
      
    //   this.actions = response;      
    // });
    // this.graphService.getActivityDefinition().subscribe((response: any) => {
    //   this.ad = response; // Handle the response      
    // });
    // this.graphService.getQuestionnaire().subscribe((response: any) => {
    //   this.questionnaire = response; // Handle the response
    // });
    // this.graphService.getStructureMap().subscribe((response: any) => {
    //   this.structureMap = response; // Handle the response
    // });
    // this.graphService.getStructureDefinition().subscribe((response: any) => {
    //   this.structureDefinition = response; // Handle the response
    // });
    // this.graphService.getLibrary().subscribe((response: any) => {
    //   this.library = response; // Handle the response
    // });
    // this.graphService.getValueSet().subscribe((response: any) => {
    //   this.valueSet = response; // Handle the response
    // });
    // this.graphService.getCode().subscribe((response: any) => {
    //   this.code = response; // Handle the response
    // });
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
