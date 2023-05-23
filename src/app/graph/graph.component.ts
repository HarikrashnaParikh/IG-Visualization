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
//           expanded: true,
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
//           expanded: true,
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
//               expanded: true,
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
//                     expanded: true,
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
//               expanded: true,
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
//               expanded: true,
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
//               expanded: true,
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
//                   expanded: true,
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
              expanded: true,
              type: 'person',
              styleClass: 'bg-blue-500 text-white',
              data: {
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

            return forkJoin([
              activityDefinition$,
              questionnaire$,
              structureMap$,
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
            ] = responses[i];
            this.activityDefinition = activityDefinitionResponse;
            this.Questionnaire = questionnaireResponse;
            this.StructureMap = structureMapResponse; // Assign the StructureMap response to the corresponding property

            this.data[0].children[i].children.push({
              expanded: true,
              type: 'person',
              styleClass: 'bg-blue-500 text-white',
              data: {
                id: this.activityDefinition.resource.id,
                description: this.activityDefinition.description,
                definitionCanonical:
                  this.activityDefinition.definitionCanonical,
              },
              children: [
                {
                  expanded: true,
                  type: 'person',
                  styleClass: 'bg-blue-500 text-white',
                  data: {
                    id: this.Questionnaire.resource.id,
                  },
                  children: [
                    {
                      expanded: true,
                      type: 'person',
                      styleClass: 'bg-blue-500 text-white',
                      data: {
                        id: this.StructureMap.resource.id, // Add the StructureMap ID to the data object
                      },
                      children: [],
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
