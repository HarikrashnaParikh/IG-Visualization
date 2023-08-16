import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { GraphComponent } from './components/graph/graph.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ResourcesComponent } from './components/resources/resources.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: UploadFileComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'resources/:resourceName', component: ResourcesComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
