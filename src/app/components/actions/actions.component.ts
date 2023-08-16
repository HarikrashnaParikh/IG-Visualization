import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphServiceService } from 'src/app/services/graphService/graph-service.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit{

  actions: any;
  currentAction: any;
  selectedPd: any;
  jsonData: any;

  constructor(private graphService: GraphServiceService,private route: ActivatedRoute){}
  
  ngOnInit(): void {
      this.getActionIds();
  }

  getActionIds(){
    this.graphService.getSelectedPlanDefinition().subscribe((planDefinition) => {
      if(planDefinition){
        this.selectedPd = planDefinition;
        this.actions = this.selectedPd.resource.action;
      }
    })
  }

  openAction(action: any){
    this.currentAction = action;
    this.jsonData = JSON.parse(JSON.stringify(this.currentAction));
  }

  
}
