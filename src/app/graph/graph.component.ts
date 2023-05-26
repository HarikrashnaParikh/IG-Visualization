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
  structureMap: any =[];
  structureDefinition: any = [];
  library: any = [];
  valueSet: any = [];
  code: any = [];

  constructor(private graphService: GraphServiceService) {}

  ngOnInit() {
    this.graphService
      .getPlanDefinition()
      .pipe(
        switchMap((response: any) => {
          const planDefinitionId = response.resource.id;
          this.data = [
            {
              expanded: true,
              type: 'person',
              styleClass: 'bg-primary text-white',
              data: {
                name: 'Plan Definition',
                id: planDefinitionId,
              },
              children: [],
            },
          ];

          return this.graphService.getActions();
        }),
        switchMap((response: any) => {
          this.actions = response;
          const actionsObservables = this.actions.map((action: any) => {
            const actionId = action.id;

            const actionDescription = action.description;
            const actionDefinitionCanonical = action.definitionCanonical;

            this.data[0].children?.push({
              expanded: false,
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

            for (let j = 0; j < target.length; j++) {
              const targetItem = target[j];
              structureMapChildren.push({
                expanded: false,
                type: 'person',
                styleClass: 'bg-light text-dark',
                data: {
                  name: 'Target',
                  id: targetItem.alias,
                },
                children: [],
              });
            }

            this.data[0].children[i].children.push({
              expanded: false,
              type: 'person',
              styleClass: 'bg-success text-white',
              data: {
                name: 'Activity Definition',
                id: activityDefinition.resource.id,
                description: activityDefinition.description,
                definitionCanonical: activityDefinition.definitionCanonical,
              },
              children: [
                {
                  expanded: false,
                  type: 'person',
                  styleClass: 'bg-secondary text-white',
                  data: {
                    name: 'Questionnaire',
                    id: questionnaire.resource.id,
                  },
                  children: [
                    {
                      expanded: false,
                      type: 'person',
                      styleClass: 'bg-danger text-white',
                      data: {
                        name: 'Structure Map',
                        id: structureMap.resource.id,
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

    this.graphService.getActivityDefinition().subscribe((response: any) => {
      this.ad = response; // Handle the response
    });

    this.graphService.getQuestionnaire().subscribe((response: any) => {
      this.questionnaire = response; // Handle the response
    });

    this.graphService.getStructureMap().subscribe((response: any) => {
      this.structureMap = response; // Handle the response
    });

    this.graphService.getStructureDefinition().subscribe((response: any) => {
      this.structureDefinition = response; // Handle the response
    });

    this.graphService.getLibrary().subscribe((response: any) => {
      this.library = response; // Handle the response
    });

    this.graphService.getValueSet().subscribe((response: any) => {
      this.valueSet = response; // Handle the response
    });

    this.graphService.getCode().subscribe((response: any) => {
      this.code = response; // Handle the response
    });
  }
}
