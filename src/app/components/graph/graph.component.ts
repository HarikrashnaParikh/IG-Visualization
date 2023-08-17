import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { GraphServiceService } from 'src/app/services/graphService/graph-service.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
    
    graphData!: TreeNode[];
    selectedPlanDefinitionData: any=[]; 
    actionData: any = [];
    definitionCanonical!: string;
    activityDefinitionData: any = [];
    selectedActionId!: string;
    resourceData: any = [];

    constructor(private graphService: GraphServiceService){}  
    
    ngOnInit(){
      this.prerequisite();
    }

    prerequisite(){
      this.graphService.getSelectedPlanDefinition().subscribe((data)=> 
      {
        this.selectedPlanDefinitionData = data;
      }
      );
      this.setGraphData(this.selectedPlanDefinitionData);
    }

    setGraphData(pdData: any){
      const pdId = pdData.resource.description ? pdData.resource.description : pdData.resource.id;
      this.graphData = [
        {
          expanded: true,
          type: 'person',
          styleClass: 'bg-primary text-white',
          data: {
            name: 'Plan Definition',
            description: pdId,
          },
          children: [],
        },
      ];

      this.getActionData();

    const actionObservables = this.actionData.map((action: any) => {
        const actionId = action.id ? action.id : action.title;        
        const actionDescription = action.description;        
        this.definitionCanonical = action.definitionCanonical;
        
        //to get ad data for particular action
        // this.getResourceData("ActivityDefinition",this.definitionCanonical);
        // this.getActivityDefinitionData(this.definitionCanonical);

      const idStartIndex = this.definitionCanonical.lastIndexOf('/') + 1;

      //this is selected actions id to go further
      this.selectedActionId = this.definitionCanonical.substr(idStartIndex);

      //api call for all ad
      this.graphService.getResource("ActivityDefinition").subscribe((adData: any) => {  
        //for particular action there is a particular activityDefinition       
        this.activityDefinitionData = adData.find((data: any) => {           
          return data.resource.id === this.selectedActionId;                     
        });


        //log
        console.log("adData",this.activityDefinitionData);
        

        this.graphData[0].children?.push({
          expanded: true,
          type: 'person',
          styleClass: 'bg-warning text-dark',
          data: {
            name: 'Action',
            id: actionId,
            description: actionDescription
          },
          children: [{
            expanded: true,
            type: 'person',
            styleClass: 'bg-success text-white',
            data: {
              name: 'Activity Definition',
              id: this.activityDefinitionData.resource.id,
              description: this.activityDefinitionData.resource.useContext?.[0].valueCodeableConcept.coding[0].display ? this.activityDefinitionData.resource.useContext?.[0].valueCodeableConcept.coding[0].display : this.activityDefinitionData.resource.id,

            },
            children: []
        }],
        })
      });
    }
    )
  }


    getActionData(){
      this.graphService.getSelectedPlanDefinition().subscribe((selectedPd) => {
      this.actionData = selectedPd.resource.action;
      console.log("================aksfkhczskc======",this.actionData);
        
      })
    }


    // async getResourceData(resourceType: string, definitionCanonical: string) {
    //   const idStartIndex = definitionCanonical.lastIndexOf('/') + 1;
    //   const selectedResourceId = definitionCanonical.substr(idStartIndex);
      
    //   // Modify the API call based on the resource type
    //   await this.graphService.getResource(resourceType).subscribe((resourceData1: any) => {  
    //     this.resourceData = resourceData1.find((data: any) => {           
    //       return data.resource.id === selectedResourceId;          
    //     });
    //     console.log(this.resourceData);
        
    //   });
    // }
    

    // getActivityDefinitionData(definitionCannonical: string ){        
    //   const idStartIndex = definitionCannonical.lastIndexOf('/') + 1;
    //   //this is selected actions id to go further
    //   this.selectedActionId = definitionCannonical.substr(idStartIndex);
    //   //api call for all ad
    //   this.graphService.getResource("ActivityDefinition").subscribe((adData: any) => {  
    //     //for particular action there is a particular activityDefinition       
    //     this.activityDefinitionData = adData.find((data: any) => {           
    //       return data.resource.id === this.selectedActionId;          
    //     });
    //     console.log("adadad****",this.activityDefinitionData);
        
    //   })
    // }

    resetZoom() {
      const graphElement = document.getElementById('graph1');
      if (graphElement) {
        graphElement.style.transform = 'scale(1)';
      }
    }
  
    zoomOut() {
      const graphElement = document.getElementById('graph1');
      if (graphElement) {
        const currentTransform = graphElement.style.transform;
        const currentScale = parseFloat(
          currentTransform ? currentTransform.replace(/[^\d.-]/g, '') : '1'
        );
        const newScale = currentScale - currentScale / 10;
        graphElement.style.transform = `scale(${newScale})`;
      }
    }
    zoomIn() {
      const graphElement = document.getElementById('graph1');
      if (graphElement) {
        const currentTransform = graphElement.style.transform;
        const currentScale = parseFloat(
          currentTransform ? currentTransform.replace(/[^\d.-]/g, '') : '1'
        );
        const newScale = currentScale + currentScale / 10;
        graphElement.style.transform = `scale(${newScale})`;
      }
    }
}
