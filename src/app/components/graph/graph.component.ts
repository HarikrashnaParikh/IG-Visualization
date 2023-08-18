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
        

      const idStartIndex = this.definitionCanonical.lastIndexOf('/') + 1;

      //this is selected actions id to go further
      this.selectedActionId = this.definitionCanonical.substr(idStartIndex);

      //api call for all ActivityDefinition
      this.graphService.getResource("ActivityDefinition").subscribe((adData: any) => {  
        if(adData){
        //for particular action there is a particular Questionnaire       
        this.activityDefinitionData = adData.find((data: any) => {           
          return data.resource.id === this.selectedActionId;                     
        });
          const activityDefinitionNode = {
            expanded: true,
            type: 'person',
            styleClass: 'bg-success text-white',
            data: {
              name: 'Activity Definition',
              id: this.activityDefinitionData.resource.id,
              description: this.activityDefinitionData.resource.useContext?.[0].valueCodeableConcept.coding[0].display ? this.activityDefinitionData.resource.useContext?.[0].valueCodeableConcept.coding[0].display : this.activityDefinitionData.resource.id,
            },
            children: []
          }
        }
        else{
          this.activityDefinitionData = [];
        }  

  
        this.graphService.getResource("Questionnaire").subscribe((qData: any) => {  
          //for particular action there is a particular Questionnaire       
          this.questionnaireData = qData.find((data: any) => {           
            return data.resource.id === this.selectedActionId;                     
          });
          // Inside the setGraphData function
          this.graphService.getResource("StructureMap").subscribe((smData: any) => {
            this.structureMapData = smData.find((data: any) => {
              return data.resource.id === this.selectedActionId;
            });
          
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
        });
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