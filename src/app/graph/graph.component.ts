import { Component, OnInit } from '@angular/core';
import {} from 'primeng';
import { TreeNode } from 'primeng/api';
import { GraphServiceService } from '../graph-service.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit {
  posts: any = [];
  activityDefinition: any = [];
  Questionnaire: any = [];
  StructureMap: any = []; // New data for StructureMap
  i: number = 0;
  j: number = 0;
  k: number = 0; // New counter for StructureMap
  children = [];
  data!: TreeNode[];
  allActions: any = [];
  Target: any = [];

  a = 1;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit() {
    this.graphService
      .getPlanDefinition()
      .pipe(
        switchMap((response: any) => {
          this.posts = response;
          this.data = [
            {
              expanded: true,
              type: 'person',
              styleClass: 'bg-indigo-500 text-white',
              data: {
                name: 'Plan Definition',
                id: this.posts.resource.id,
              },
              children: [],
            },
          ];

          return this.graphService.getActions();
        }),
        switchMap((response: any) => {
          this.allActions = response;

          const actionsObservables = this.allActions.map((action: any) => {
            this.data[0].children?.push({
              expanded: false,
              type: 'person',
              styleClass: 'bg-blue-500 text-white',
              data: {
                name: 'Action',
                id: action.id,
                description: action.description,
                definitionCanonical: action.definitionCanonical,
              },
              children: [],
            });

            const idStartIndex: number =
              action.definitionCanonical.lastIndexOf('/') + 1;
            const activityDefinitionId: string =
              action.definitionCanonical.substr(idStartIndex);

            const activityDefinition$ =
              this.graphService.getActivityDefinitionById(activityDefinitionId);
            const questionnaire$ =
              this.graphService.getQuestionnaireByID(activityDefinitionId);
            const structureMap$ =
              this.graphService.getStructureMapByID(activityDefinitionId); // New API call for StructureMap
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
            this.activityDefinition = activityDefinitionResponse;
            this.Questionnaire = questionnaireResponse;
            this.StructureMap = structureMapResponse; // Assign the StructureMap response to the corresponding property
            this.Target = targetResponse;

            const structureMapChildren = []; // Array to hold multiple children for StructureMap

            // Add multiple children for StructureMap data
            for (let j = 0; j < this.Target.length; j++) {
              const targetItem = this.Target[j];
              structureMapChildren.push({
                expanded: false,
                type: 'person',
                styleClass: 'bg-blue-500 text-white',
                data: {
                  name: 'Target',
                  id: targetItem.alias,
                },
                children: [], // You can add additional children for each target item if needed
              });
            }

            this.data[0].children[i].children.push({
              expanded: false,
              type: 'person',
              styleClass: 'bg-blue-500 text-white',
              data: {
                name: 'Activity Definition',
                id: this.activityDefinition.resource.id,
                description: this.activityDefinition.description,
                definitionCanonical:
                  this.activityDefinition.definitionCanonical,
              },
              children: [
                {
                  expanded: false,
                  type: 'person',
                  styleClass: 'bg-blue-500 text-white',
                  data: {
                    name: 'Questionnaire',
                    id: this.Questionnaire.resource.id,
                  },
                  children: [
                    {
                      expanded: false,
                      type: 'person',
                      styleClass: 'bg-blue-500 text-white',
                      data: {
                        name: 'Structure Map',
                        id: this.StructureMap.resource.id,
                      },
                      children: structureMapChildren, // Assign the structureMapChildren array to the children property
                    },
                  ],
                },
              ],
            });

            console.log(this.Questionnaire.resource.id);
            console.log(this.StructureMap.resource.id); // Log the StructureMap ID
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

// import { Component, OnInit } from '@angular/core';
// import {} from 'primeng';
// import { TreeNode } from 'primeng/api';
// import { GraphServiceService } from '../graph-service.service';
// @Component({
//   selector: 'app-graph',
//   templateUrl: './graph.component.html',
// })
// export class GraphComponent implements OnInit {
//   posts: any = [];
//   activityDefinition: any = [];
//   Questionnaire: any = [];
//   i: number = 0;
//   j: number = 0;
//   children = [];
//   data!: TreeNode[];
//   allActions: any = [];
//   constructor(private graphService: GraphServiceService) {}
//   ngOnInit() {
//     //Plan Definition
//     this.graphService.getPlanDefinition().subscribe((response: any) => {
//       this.posts = response;
//       this.data = [
//         {
//           expanded: false,
//           type: 'person',
//           styleClass: 'bg-indigo-500 text-white',
//           data: {
//             id: this.posts.resource.id,
//           },
//           children: [],
//         },
//       ];
//     });

//     //Actions
//     this.graphService.getActions().subscribe((response: any) => {
//       this.allActions = response;

//       for (let action of this.allActions) {
//         this.data[0].children?.push({
//           expanded: false,
//           type: 'person',
//           styleClass: 'bg-blue-500 text-white',
//           data: {
//             id: action.id,
//             description: action.description,
//             definitionCanonical: action.definitionCanonical,
//           },
//           children: [],
//         });

//         //Activity Definition

//         const idStartIndex: number =
//           action.definitionCanonical.lastIndexOf('/') + 1;
//         const activityDefinitionId: string =
//           action.definitionCanonical.substr(idStartIndex);

//         this.graphService
//           .getActivityDefinitionById(activityDefinitionId)
//           .subscribe((response1: any) => {
//             this.activityDefinition = response1;
//             this.data[0].children[this.i].children.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 id: this.activityDefinition.resource.id,
//                 description: this.activityDefinition.description,
//                 definitionCanonical:
//                   this.activityDefinition.definitionCanonical,
//               },
//               children: [],
//             });

//             this.graphService
//               .getQuestionnaireByID(this.activityDefinition.resource.id)
//               .subscribe(
//                 (response2: any) => {
//                   this.Questionnaire = response2;
//                   this.data[0].children[this.j].children[0].children?.push({
//                     expanded: false,
//                     type: 'person',
//                     styleClass: 'bg-blue-500 text-white',
//                     data: {
//                       id: this.Questionnaire.resource.id,
//                     },
//                     children: [],
//                   });
//                   console.log(this.Questionnaire.resource.id);
//                   this.j += 1;
//                 },
//                 (error) => {
//                   console.log(error);
//                 }
//               );

//             this.i += 1;
//         });
//       }
//     });
//   }
// // }
// import { Component, OnInit } from '@angular/core';
// import {} from 'primeng';
// import { TreeNode } from 'primeng/api';
// import { GraphServiceService } from '../graph-service.service';
// import { forkJoin } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-graph',
//   templateUrl: './graph.component.html',
// })
// export class GraphComponent implements OnInit {
//   posts: any = [];
//   activityDefinition: any = [];
//   Questionnaire: any = [];
//   i: number = 0;
//   j: number = 0;
//   children = [];
//   data!: TreeNode[];
//   allActions: any = [];

//   constructor(private graphService: GraphServiceService) {}

//   ngOnInit() {
//     this.graphService
//       .getPlanDefinition()
//       .pipe(
//         switchMap((response: any) => {
//           this.posts = response;
//           this.data = [
//             {
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-indigo-500 text-white',
//               data: {
//                 id: this.posts.resource.id,
//               },
//               children: [],
//             },
//           ];

//           return this.graphService.getActions();
//         }),
//         switchMap((response: any) => {
//           this.allActions = response;

//           const actionsObservables = this.allActions.map((action: any) => {
//             this.data[0].children?.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 id: action.id,
//                 description: action.description,
//                 definitionCanonical: action.definitionCanonical,
//               },
//               children: [],
//             });

//             const idStartIndex: number =
//               action.definitionCanonical.lastIndexOf('/') + 1;
//             const activityDefinitionId: string =
//               action.definitionCanonical.substr(idStartIndex);

//             const activityDefinition$ =
//               this.graphService.getActivityDefinitionById(activityDefinitionId);
//             const questionnaire$ =
//               this.graphService.getQuestionnaireByID(activityDefinitionId);

//             return forkJoin([activityDefinition$, questionnaire$]);
//           });

//           return forkJoin(actionsObservables);
//         })
//       )
//       .subscribe(
//         (responses: any) => {
//           for (let i = 0; i < responses.length; i++) {
//             const [activityDefinitionResponse, questionnaireResponse] =
//               responses[i];
//             this.activityDefinition = activityDefinitionResponse;
//             this.Questionnaire = questionnaireResponse;

//             this.data[0].children[i].children.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 id: this.activityDefinition.resource.id,
//                 description: this.activityDefinition.description,
//                 definitionCanonical:
//                   this.activityDefinition.definitionCanonical,
//               },
//               children: [
//                 {
//                   expanded: false,
//                   type: 'person',
//                   styleClass: 'bg-blue-500 text-white',
//                   data: {
//                     id: this.Questionnaire.resource.id,
//                   },
//                   children: [],
//                 },
//               ],
//             });

//             console.log(this.Questionnaire.resource.id);
//             this.j += 1;
//           }

//           // Additional code or actions to perform after obtaining the data
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import {} from 'primeng';
// import { TreeNode } from 'primeng/api';
// import { GraphServiceService } from '../graph-service.service';
// import { forkJoin } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-graph',
//   templateUrl: './graph.component.html',
// })
// export class GraphComponent implements OnInit {
//   posts: any = [];
//   activityDefinition: any = [];
//   Questionnaire: any = [];
//   StructureMap: any = []; // New data for StructureMap
//   Target: any = []; // New data for target
//   i: number = 0;
//   j: number = 0;
//   k: number = 0; // New counter for StructureMap
//   a: number = 0; // New counter for target
//   children = [];
//   data!: TreeNode[];
//   allActions: any = [];

//   constructor(private graphService: GraphServiceService) {}

//   ngOnInit() {
//     this.graphService
//       .getPlanDefinition()
//       .pipe(
//         switchMap((response: any) => {
//           this.posts = response;
//           this.data = [
//             {
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-indigo-500 text-white',
//               data: {
//                 name: 'Plan Definition',
//                 id: this.posts.resource.id,
//               },
//               children: [],
//             },
//           ];

//           return this.graphService.getActions();
//         }),
//         switchMap((response: any) => {
//           this.allActions = response;

//           const actionsObservables = this.allActions.map((action: any) => {
//             this.data[0].children?.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 name: 'Action',
//                 id: action.id,
//                 description: action.description,
//                 definitionCanonical: action.definitionCanonical,
//               },
//               children: [],
//             });

//             const idStartIndex: number =
//               action.definitionCanonical.lastIndexOf('/') + 1;
//             const activityDefinitionId: string =
//               action.definitionCanonical.substr(idStartIndex);

//             const activityDefinition$ =
//               this.graphService.getActivityDefinitionById(activityDefinitionId);
//             const questionnaire$ =
//               this.graphService.getQuestionnaireByID(activityDefinitionId);
//             const structureMap$ =
//               this.graphService.getStructureMapByID(activityDefinitionId); // New API call for StructureMap
//             const target$ =
//               this.graphService.getTargetById(activityDefinitionId); // New API call for target
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
//               targeResponse,
//             ] = responses[i];
//             this.activityDefinition = activityDefinitionResponse;
//             this.Questionnaire = questionnaireResponse;
//             this.StructureMap = structureMapResponse; // Assign the StructureMap response to the corresponding property
//             this.Target = targeResponse; // Assign the target response to the corresponding property

//             const structureMapChildren = [];
//             // Add multiple children for StructureMap data
//             for (let j = 0; j < this.Target.length; j++) {
//               structureMapChildren.push({
//                 expanded: false,
//                 type: 'person',
//                 styleClass: 'bg-blue-500 text-white',
//                 data: {
//                   name: 'Target',
//                   id: this.Target[j].alias,
//                 },
//                 children: [],
//               });
//             }
//             console.log("This is chillld....."+structureMapChildren);

//             this.data[0].children[i].children.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 name: 'Activity Definition',
//                 id: this.activityDefinition.resource.id,
//                 description: this.activityDefinition.description,
//                 definitionCanonical:
//                   this.activityDefinition.definitionCanonical,
//               },
//               children: [
//                 {
//                   expanded: false,
//                   type: 'person',
//                   styleClass: 'bg-blue-500 text-white',
//                   data: {
//                     name: 'Questionnaire',
//                     id: this.Questionnaire.resource.id,
//                   },
//                   children: [
//                     {
//                       expanded: false,
//                       type: 'person',
//                       styleClass: 'bg-blue-500 text-white',
//                       data: {
//                         name: 'Structure Map',
//                         id: this.StructureMap.resource.id, // Add the StructureMap ID to the data object
//                       },
//                       children: structureMapChildren,
//                     },
//                   ],
//                 },
//               ],
//             });
//             this.a = this.a + 1;
//             console.log(this.Questionnaire.resource.id);
//             console.log(this.StructureMap.resource.id); // Log the StructureMap ID
//           }
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }
// }

//

// import { Component, OnInit } from '@angular/core';
// import {} from 'primeng';
// import { TreeNode } from 'primeng/api';
// import { GraphServiceService } from '../graph-service.service';
// import { forkJoin } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-graph',
//   templateUrl: './graph.component.html',
// })
// export class GraphComponent implements OnInit {
//   posts: any = [];
//   activityDefinition: any = [];
//   Questionnaire: any = [];
//   StructureMap: any = []; // New data for StructureMap
//   i: number = 0;
//   j: number = 0;
//   k: number = 0; // New counter for StructureMap
//   children = [];
//   data!: TreeNode[];
//   allActions: any = [];
//   Target: any = [];

//   a = 1;
//   constructor(private graphService: GraphServiceService) {}

//   ngOnInit() {
//     this.graphService
//       .getPlanDefinition()
//       .pipe(
//         switchMap((response: any) => {
//           this.posts = response;
//           this.data = [
//             {
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-indigo-500 text-white',
//               data: {
//                 name: 'Plan Definition',
//                 id: this.posts.resource.id,
//               },
//               children: [],
//             },
//           ];

//           return this.graphService.getActions();
//         }),
//         switchMap((response: any) => {
//           this.allActions = response;

//           const actionsObservables = this.allActions.map((action: any) => {
//             this.data[0].children?.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 name: 'Action',
//                 id: action.id,
//                 description: action.description,
//                 definitionCanonical: action.definitionCanonical,
//               },
//               children: [],
//             });

//             const idStartIndex: number =
//               action.definitionCanonical.lastIndexOf('/') + 1;
//             const activityDefinitionId: string =
//               action.definitionCanonical.substr(idStartIndex);

//             const activityDefinition$ =
//               this.graphService.getActivityDefinitionById(
//                 activityDefinitionId
//               );
//             const questionnaire$ = this.graphService.getQuestionnaireByID(
//               activityDefinitionId
//             );
//             const structureMap$ = this.graphService.getStructureMapByID(
//               activityDefinitionId
//             ); // New API call for StructureMap
//             const target$ = this.graphService.getTargetById(
//               activityDefinitionId
//             );

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
//             this.activityDefinition = activityDefinitionResponse;
//             this.Questionnaire = questionnaireResponse;
//             this.StructureMap = structureMapResponse; // Assign the StructureMap response to the corresponding property
//             this.Target = targetResponse;

//             const structureMapChildren = []; // Array to hold multiple children for StructureMap

//             // Add multiple children for StructureMap data
//             for (let j = 0; j < this.Target.length; j++) {
//               const targetItem = this.Target[j];
//               structureMapChildren.push({
//                 expanded: false,
//                 type: 'person',
//                 styleClass: 'bg-blue-500 text-white',
//                 data: {
//                   name: 'Child Structure Map',
//                   id: targetItem.alias,
//                 },
//                 children: [], // You can add additional children for each target item if needed
//               });
//             }

//             this.data[0].children[i].children.push({
//               expanded: false,
//               type: 'person',
//               styleClass: 'bg-blue-500 text-white',
//               data: {
//                 name: 'Activity Definition',
//                 id: this.activityDefinition.resource.id,
//                 description: this.activityDefinition.description,
//                 definitionCanonical: this.activityDefinition.definitionCanonical,
//               },
//               children: [
//                 {
//                   expanded: false,
//                   type: 'person',
//                   styleClass: 'bg-blue-500 text-white',
//                   data: {
//                     name: 'Questionnaire',
//                     id: this.Questionnaire.resource.id,
//                   },
//                   children: [
//                     {
//                       expanded: false,
//                       type: 'person',
//                       styleClass: 'bg-blue-500 text-white',
//                       data: {
//                         name: 'Structure Map',
//                         id: this.StructureMap.resource.id,
//                       },
//                       children: structureMapChildren, // Assign the structureMapChildren array to the children property
//                     },
//                   ],
//                 },
//               ],
//             });

//             console.log(this.Questionnaire.resource.id);
//             console.log(this.StructureMap.resource.id); // Log the StructureMap ID
//           }
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }
// }
