import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  private url = 'http://localhost:8080';
  

  // inHome = new BehaviorSubject<boolean>(false)
  // inHome:boolean=false
  // activityDefinitionId : any;

  constructor(private httpClient: HttpClient) {}
  
  getAllResources(){
    return this.httpClient.get(`${this.url}/allResources`);
  }

  getAllResourcesWithCount(){
    return this.httpClient.get(`${this.url}/allResourceCount`)
  }

  getResource(resourceName: string){
    return this.httpClient.get(`${this.url}/getResource/${resourceName}`)
  }

  
}
