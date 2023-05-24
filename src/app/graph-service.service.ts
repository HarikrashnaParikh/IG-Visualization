import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  private url = 'http://localhost:8080'; 
  // activityDefinitionId : any;

  constructor(private httpClient: HttpClient) {}

  getPlanDefinition(){  
    return this.httpClient.get(`${this.url}/planDefinition`);
  }

  getActions(){
    return this.httpClient.get(`${this.url}/planDefinition/actions`);
  }

  getActivityDefinition(){
    return this.httpClient.get(`${this.url}/activityDefinition`);
  }

  getActivityDefinitionById(activityDefinitionId: any){
    
    return this.httpClient.get(`${this.url}/activityDefinition/`+activityDefinitionId);
  }

  getQuestionnaireByID(activityDefinitionId: any){
    return this.httpClient.get(`${this.url}/questionnaire/`+activityDefinitionId);
  }

  getStructureMapByID(activityDefinitionId: any){
    return this.httpClient.get(`${this.url}/structureMap/`+activityDefinitionId);
  }
  
  getTargetById(activityDefinitionId: any){
    return this.httpClient.get(`${this.url}/targetFromStructureMap/`+activityDefinitionId);
  }
}
