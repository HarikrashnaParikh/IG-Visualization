import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { GraphServiceService } from '../graph-service.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'], // Add this line to link the CSS file
})
export class GraphComponent implements OnInit {
  data!: TreeNode[];
  actions: any = [];
  ad: any = [];
  questionnaire: any = [];
  structureMap: any = [];
  structureDefinition: any = [];
  library: any = [];
  valueSet: any = [];
  code: any = [];
  pdId!: string;

  constructor(private graphService: GraphServiceService) {}

  ngOnInit() {
    this.graphService
      .getPlanDefinitionById(this.pdId)
      .pipe(
        switchMap((response: any) => {
          const planDefinitionId = response.resource.description ? response.resource.description : response.resource.id ;
          this.data = [
            {
              expanded: true,
              type: 'person',
              styleClass: 'bg-primary text-white',
              data: {
                name: 'Plan Definition',
                description: planDefinitionId,
              },
              children: [],
            },
          ];

          return this.graphService.getActions(this.pdId);
        }),
        switchMap((response: any) => {
          this.actions = response;
          const actionsObservables = this.actions.map((action: any) => {
            const actionId = action.id;

            const actionDescription = action.description;
            const actionDefinitionCanonical = action.definitionCanonical;

            this.data[0].children?.push({
              expanded: true,
              type: 'person',
              styleClass: 'bg-warning text-dark',
              data: {
                name: 'Action',
                id: actionId,
                description: actionDescription,
                definitionCanonical: actionDefinitionCanonical,
              },
              children: [],
            });

            const idStartIndex = actionDefinitionCanonical.lastIndexOf('/') + 1;
            const activityDefinitionId =
              actionDefinitionCanonical.substr(idStartIndex);

            const activityDefinition$ =
              this.graphService.getActivityDefinitionById(activityDefinitionId);
            const questionnaire$ =
              this.graphService.getQuestionnaireById(activityDefinitionId);
            const structureMap$ =
              this.graphService.getStructureMapById(activityDefinitionId);
            const target$ =
              this.graphService.getTargetById(activityDefinitionId);

            return forkJoin([
              activityDefinition$,
              questionnaire$,
              structureMap$,
              target$,
            ]);
          });

          return forkJoin(actionsObservables);
        })
      )
      .subscribe(
        (responses: any) => {
          for (let i = 0; i < responses.length; i++) {
            const [
              activityDefinitionResponse,
              questionnaireResponse,
              structureMapResponse,
              targetResponse,
            ] = responses[i];
            const activityDefinition = activityDefinitionResponse;
            const questionnaire = questionnaireResponse;
            const structureMap = structureMapResponse;
            const target = targetResponse;

            const structureMapChildren = [];

            // Check if target response is empty
            if (target && target.length > 0) {
              for (let j = 0; j < target.length; j++) {
                const targetItem = target[j];
                structureMapChildren.push({
                  expanded: true,
                  type: 'person',
                  styleClass: 'bg-light text-dark',
                  data: {
                    name: 'Target',
                    description: targetItem.alias,
                  },
                  children: [],
                });
              }
            }

            this.data[0].children[i].children.push({
              expanded: true,
              type: 'person',
              styleClass: 'bg-success text-white',
              data: {
                name: 'Activity Definition',
                id: activityDefinition.resource.id,
                description: activityDefinition.resource.useContext?.[0].valueCodeableConcept.coding[0].display ? activityDefinition.resource.useContext?.[0].valueCodeableConcept.coding[0].display : activityDefinition.resource.id,
                definitionCanonical: activityDefinition.definitionCanonical,
              },
              children: [
                {
                  expanded: true,
                  type: 'person',
                  styleClass: 'bg-secondary text-white',
                  data: {
                    name: 'Questionnaire',
                    id: questionnaire.resource.id,
                    description : questionnaire.resource.title ? questionnaire.resource.title : questionnaire.resource.name
                  },
                  children: [
                    {
                      expanded: true,
                      type: 'person',
                      styleClass: 'bg-danger text-white',
                      data: {
                        name: 'Structure Map',
                        id: structureMap.resource.id,
                        description : structureMap.resource.name
                      },
                      children: structureMapChildren,
                    },
                  ],
                },
              ],
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
























// export class GraphComponent implements OnInit {
//   data!: TreeNode[];
//   actions: any = [];
//   ad: any = [];
//   questionnaire: any = [];
//   structureMap: any = [];
//   structureDefinition: any = [];
//   library: any = [];
//   valueSet: any = [];
//   code: any = [];
//   pdId!: string;

//   constructor(private graphService: GraphServiceService) {}

//   ngOnInit() {
//     this.graphService
//       .getPlanDefinition()
//       .pipe(
//         switchMap((response: any) => {
//           console.log(response);
//           const planDefinitionId = response[0].resource.description ? response[0].resource.description : response[0].resource.id ;
//           this.data = [
//             {
//               expanded: true,
//               type: 'person',
//               styleClass: 'bg-primary text-white',
//               data: {
//                 name: 'Plan Definition',
//                 description: planDefinitionId,
//               },
//               children: [],
//             },
//           ];

//           return this.graphService.getActions(this.pdId);
//         }),
//         switchMap((response: any) => {
//           this.actions = response;
//           const actionsObservables = this.actions.map((action: any) => {
//             const actionId = action.id;

//             const actionDescription = action.description;
//             const actionDefinitionCanonical = action.definitionCanonical;

//             this.data[0].children?.push({
//               expanded: true,
//               type: 'person',
//               styleClass: 'bg-warning text-dark',
//               data: {
//                 name: 'Action',
//                 id: actionId,
//                 description: actionDescription,
//                 definitionCanonical: actionDefinitionCanonical,
//               },
//               children: [],
//             });

//             const idStartIndex = actionDefinitionCanonical.lastIndexOf('/') + 1;
//             const activityDefinitionId =
//               actionDefinitionCanonical.substr(idStartIndex);

//             const activityDefinition$ =
//               this.graphService.getActivityDefinitionById(activityDefinitionId);
//             const questionnaire$ =
//               this.graphService.getQuestionnaireById(activityDefinitionId);
//             const structureMap$ =
//               this.graphService.getStructureMapById(activityDefinitionId);
//             const target$ =
//               this.graphService.getTargetById(activityDefinitionId);

//             return forkJoin([
//               activityDefinition$,
//               questionnaire$,
//               structureMap$,
//               target$,
//             ]);
//           });

//           return forkJoin(actionsObservables);
//         })
//       )
//       .subscribe(
//         (responses: any) => {
//           for (let i = 0; i < responses.length; i++) {
//             const [
//               activityDefinitionResponse,
//               questionnaireResponse,
//               structureMapResponse,
//               targetResponse,
//             ] = responses[i];
//             const activityDefinition = activityDefinitionResponse;
//             const questionnaire = questionnaireResponse;
//             const structureMap = structureMapResponse;
//             const target = targetResponse;

//             const structureMapChildren = [];

//             for (let j = 0; j < target.length; j++) {
//               const targetItem = target[j];
//               structureMapChildren.push({
//                 expanded: true,
//                 type: 'person',
//                 styleClass: 'bg-light text-dark',
//                 data: {
//                   name: 'Target',
//                   description : targetItem.alias,
//                 },
//                 children: [],
//               });
//             }

//             this.data[0].children[i].children.push({
//               expanded: true,
//               type: 'person',
//               styleClass: 'bg-success text-white',
//               data: {
//                 name: 'Activity Definition',
//                 id: activityDefinition.resource.id,
//                 description: activityDefinition.resource.useContext?.[0].valueCodeableConcept.coding[0].display ? activityDefinition.resource.useContext?.[0].valueCodeableConcept.coding[0].display : activityDefinition.resource.id,
//                 definitionCanonical: activityDefinition.definitionCanonical,
//               },
//               children: [
//                 {
//                   expanded: true,
//                   type: 'person',
//                   styleClass: 'bg-secondary text-white',
//                   data: {
//                     name: 'Questionnaire',
//                     id: questionnaire.resource.id,
//                     description : questionnaire.resource.title ? questionnaire.resource.title : questionnaire.resource.name
//                   },
//                   children: [
//                     {
//                       expanded: true,
//                       type: 'person',
//                       styleClass: 'bg-danger text-white',
//                       data: {
//                         name: 'Structure Map',
//                         id: structureMap.resource.id,
//                         description : structureMap.resource.name
//                       },
//                       children: structureMapChildren,
//                     },
//                   ],
//                 },
//               ],
//             });
//           }
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }
//   resetZoom() {
//     const graphElement = document.getElementById('graph1');
//     if (graphElement) {
//       graphElement.style.transform = 'scale(1)';
//     }
//   }

//   zoomOut() {
//     const graphElement = document.getElementById('graph1');
//     if (graphElement) {
//       const currentTransform = graphElement.style.transform;
//       const currentScale = parseFloat(
//         currentTransform ? currentTransform.replace(/[^\d.-]/g, '') : '1'
//       );
//       const newScale = currentScale - currentScale / 10;
//       graphElement.style.transform = `scale(${newScale})`;
//     }
//   }
//   zoomIn() {
//     const graphElement = document.getElementById('graph1');
//     if (graphElement) {
//       const currentTransform = graphElement.style.transform;
//       const currentScale = parseFloat(
//         currentTransform ? currentTransform.replace(/[^\d.-]/g, '') : '1'
//       );
//       const newScale = currentScale + currentScale / 10;
//       graphElement.style.transform = `scale(${newScale})`;
//     }
//   }
// }
