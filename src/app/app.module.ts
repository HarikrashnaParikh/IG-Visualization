import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {OrganizationChartModule} from 'primeng/organizationchart'
import { GraphComponent } from './graph/graph.component';
import {HttpClientModule} from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component'
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionsComponent } from './actions/actions.component';
import { ActionDefinitionComponent } from './action-definition/action-definition.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { StructureMapComponent } from './structure-map/structure-map.component';
import { TargetsComponent } from './targets/targets.component';
import { StructureDefinitionComponent } from './structure-definition/structure-definition.component';
import { LibraryComponent } from './library/library.component';
import { ValueSetComponent } from './value-set/value-set.component';
import { CodeSystemComponent } from './code-system/code-system.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    UploadFileComponent,
    NavbarComponent,
    ActionsComponent,
    ActionDefinitionComponent,
    QuestionnaireComponent,
    StructureMapComponent,
    TargetsComponent,
    StructureDefinitionComponent,
    LibraryComponent,
    ValueSetComponent,
    CodeSystemComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrganizationChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
