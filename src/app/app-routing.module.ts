import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionDefinitionComponent } from './action-definition/action-definition.component';
import { ActionsComponent } from './actions/actions.component';
import { AppComponent } from './app.component';
import { CodeSystemComponent } from './code-system/code-system.component';
import { GraphComponent } from './graph/graph.component';
import { LibraryComponent } from './library/library.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { StructureDefinitionComponent } from './structure-definition/structure-definition.component';
import { StructureMapComponent } from './structure-map/structure-map.component';
import { TargetsComponent } from './targets/targets.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ValueSetComponent } from './value-set/value-set.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: UploadFileComponent },
  { path: 'planDefinition', component: GraphComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'activityDefinition', component: ActionDefinitionComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'structureMap', component: StructureMapComponent },
  { path: 'targets', component: TargetsComponent },
  { path: 'structureDefinition', component: StructureDefinitionComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'valueSet', component: ValueSetComponent },
  { path: 'codeSystem', component: CodeSystemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
