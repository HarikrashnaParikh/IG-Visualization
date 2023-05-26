import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-action-definition',
  templateUrl: './action-definition.component.html',
  styleUrls: ['./action-definition.component.css']
})
export class ActionDefinitionComponent {
  activityDefinition: any;
  currentActivityDefinition: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getActivityDefinition().subscribe((activityDefinition) => {
      this.activityDefinition = activityDefinition;
      console.log(this.activityDefinition);

    });
  }

  openAction(id: String) {
    this.graphService.getActivityDefinitionById(id).subscribe((ad) => {
      this.currentActivityDefinition = JSON.parse(JSON.stringify(ad))
    });

  }

}
