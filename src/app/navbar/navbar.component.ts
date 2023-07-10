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
  pdId!: string ;
  constructor(
    private router: Router,
    private graphService: GraphServiceService,
    ) {}
    
    async ngOnInit() {
    this.fileName = sessionStorage.getItem("fileName")!;
    this.nameWithoutExtension = this.fileName.split(".")[0]; 
    this.capitalizedFirstName = this.nameWithoutExtension.charAt(0).toUpperCase() + this.nameWithoutExtension.slice(1);

    await this.graphService.getPlanDefinition().subscribe((response: any)=>{
      this.planDefinition = response;
      localStorage.setItem('pdIdDefault', this.planDefinition[0].resource.id);
    })

    this.graphService.getActions(this.pdId).subscribe((response: any) => {
      
      this.actions = response;
      console.log("here is actions... "+JSON.stringify(this.actions));
      
    });
    this.graphService.getActivityDefinition().subscribe((response: any) => {
      this.ad = response; // Handle the response
      console.log("here is activity definition ... "+this.ad);
      
    });
    this.graphService.getQuestionnaire().subscribe((response: any) => {
      this.questionnaire = response; // Handle the response
      console.log("here is questionarie ... "+this.questionnaire); 
    });
    this.graphService.getStructureMap().subscribe((response: any) => {
      this.structureMap = response; // Handle the response

      console.log("here is questionarie ... "+this.structureMap);
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
