import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphServiceService } from 'src/app/services/graphService/graph-service.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {

  resourceType!: string;
  resourceData : any = [];
  currentResource: any =[];
  selectedId : any;
  jsonData :any;

  constructor(private graphService: GraphServiceService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resourceType = params['resourceName']
      this.getResourceData();
    })
  }

  getResourceData(){
    this.graphService.getResource(this.resourceType).subscribe((response) => {
      this.resourceData = response;        
    })
  }

  openResource(id: String) {
    this.selectedId = id;
    this.currentResource = this.resourceData.find((resource: any) => resource.resource.id == id);
    this.jsonData = JSON.parse(JSON.stringify(this.currentResource));
  }
}
