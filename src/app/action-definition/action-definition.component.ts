import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-action-definition',
  templateUrl: './action-definition.component.html',
  styleUrls: ['./action-definition.component.css']
})
export class ActionDefinitionComponent {
  activityDefinition: any;
  currentActivityDefinition: any ;

  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getActivityDefinition().subscribe((activityDefinition) => {
      this.activityDefinition = activityDefinition;
      console.log(this.activityDefinition);

    });
  }

  openAction(id: String) {
    console.log("Clicking");
    
    this.graphService.getActivityDefinitionById(id).subscribe((ad) => {
      console.log(ad);
      
      this.currentActivityDefinition = JSON.parse(JSON.stringify(ad))
      console.log(this.currentActivityDefinition);
      
    });

  }

}
