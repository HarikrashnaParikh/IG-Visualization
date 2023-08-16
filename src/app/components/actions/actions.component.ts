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
  selectedId: any;
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

  openAction(selectedId: string){
    this.selectedId = selectedId;
    this.currentAction = this.actions.find((action: any) => action.title = selectedId);
    this.jsonData = JSON.parse(JSON.stringify(this.currentAction));
    console.log(this.currentAction.title);
    
    
  }

  
}
