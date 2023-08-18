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
    questionnaireData: any = [];
    structureMapData: any = []; 
    allAdData: any = [];
    allQData : any = [];
    allSmData: any = [];

    constructor(private graphService: GraphServiceService){}  
    
    ngOnInit(){
      this.prerequisite();
    }

    async prerequisite(){
      console.log("Calling Selected Plan Definition");
      this.graphService.getSelectedPlanDefinition().subscribe((data)=> 
      {
        this.selectedPlanDefinitionData = data;
        this.graphService.getResource("ActivityDefinition").subscribe((data) => {
          console.log(data);
          this.allAdData = data;
          this.graphService.getResource("Questionnaire").subscribe((data) => {
            this.allQData = data;
            this.graphService.getResource("StructureMap").subscribe((data) => {
              this.allSmData = data;
              this.setGraphData(this.selectedPlanDefinitionData);
            })
          })
        });
      }
      );
      console.log("Calling Activity Definition");
      
      console.log("Calling Questionnaire");
      
      console.log("Calling Structure Map");
      
      console.log("Calling Set Graph Data");
    }

    async setGraphData(pdData: any){
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

     this.actionData.forEach(async(action: any) => {
        const actionId = action.id ? action.id : action.title;        
        const actionDescription = action.description;        
        this.definitionCanonical = action.definitionCanonical;
        

      const idStartIndex = this.definitionCanonical.lastIndexOf('/') + 1;

      //this is selected actions id to go further
      this.selectedActionId = this.definitionCanonical.substr(idStartIndex);
      // console.log(this.selectedActionId);
      // console.log("Started Waiting For the response")
      await this.callApi(actionId,actionDescription);

      // console.log("Response Is Awaited")
      
    }
    )
  }
    getActionData(){
      this.graphService.getSelectedPlanDefinition().subscribe((selectedPd) => {
      this.actionData = selectedPd.resource.action;
      // console.log("================aksfkhczskc======",this.actionData);
        
      })
    }

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
    callApi(actionId: string ,actionDescription: string){

      //api call for all ActivityDefinition
      // console.log("Api is to be called",actionId)
      return new Promise<void>((res,rej)=>{
        console.log(this.allAdData);
      
      this.activityDefinitionData = this.allAdData.find((data: any) => {  
        console.log(data);         
        return data.resource.id === this.selectedActionId;                     
      });
      console.log(this.activityDefinitionData);
      this.questionnaireData = this.allQData.find((data: any) => {           
        return data.resource.id === this.selectedActionId;                     
      });

      this.structureMapData = this.allSmData.find((data: any) => {
        return data.resource.id === this.selectedActionId;
      });
      res();    
      // Adding Structure Map node if data is available
      const structureMapNode = this.structureMapData ? {
        expanded: true,
        type: 'person',
        styleClass: 'bg-danger text-white',
        data: {
          name: 'Structure Map',
          id: this.structureMapData.resource.id,
          description: this.structureMapData.resource.useContext?.[0].valueCodeableConcept.coding[0].display
            ? this.structureMapData.resource.useContext[0].valueCodeableConcept.coding[0].display
            : this.structureMapData.resource.id,
        },
        children: [], // No children for Structure Map as per your original structure
      } : null;
    
      // Adding Questionnaire node with Structure Map as its child if data is available
      const questionnaireNode = this.questionnaireData ? {
        expanded: true,
        type: 'person',
        styleClass: 'bg-secondary text-white',
        data: {
          name: 'Questionnaire',
          id: this.questionnaireData.resource.id,
          description: this.questionnaireData.resource.useContext?.[0].valueCodeableConcept.coding[0].display
            ? this.questionnaireData.resource.useContext[0].valueCodeableConcept.coding[0].display
            : this.questionnaireData.resource.id,
        },
        children: structureMapNode ? [structureMapNode] : [],
      } : null;
    
      // Adding Activity Definition node with Questionnaire as its child if data is available
      const activityDefinitionNode = this.activityDefinitionData ? {
        expanded: true,
        type: 'person',
        styleClass: 'bg-success text-white',
        data: {
          name: 'Activity Definition',
          id: this.activityDefinitionData.resource.id,
          description: this.activityDefinitionData.resource.useContext?.[0].valueCodeableConcept.coding[0].display
            ? this.activityDefinitionData.resource.useContext[0].valueCodeableConcept.coding[0].display
            : this.activityDefinitionData.resource.id,
        },
        children: questionnaireNode ? [questionnaireNode] : [],
      } : null;
    
      // Adding Action node with Activity Definition as its child if data is available
      const actionNode = {
        expanded: true,
        type: 'person',
        styleClass: 'bg-warning text-dark',
        data: {
          name: 'Action',
          id: actionId,
          description: actionDescription,
        },
        children: activityDefinitionNode ? [activityDefinitionNode] : [],
      };
    
      this.graphData[0].children?.push(actionNode);
      });
    }
}