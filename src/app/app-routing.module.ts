import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  { path: 'home', component: UploadFileComponent },
  { path: 'planDefinition', component: GraphComponent },
  {path: 'actions', component: ActionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
