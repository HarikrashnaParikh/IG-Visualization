import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OrganizationChartModule } from 'primeng/organizationchart'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActionsComponent } from './components/actions/actions.component';
import { GraphComponent } from './components/graph/graph.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ScrollerModule} from 'primeng/scroller';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    NavbarComponent,
    ActionsComponent,
    GraphComponent,
    ResourcesComponent  
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    OrganizationChartModule,
    HttpClientModule,
    DropdownModule,
    ScrollerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
