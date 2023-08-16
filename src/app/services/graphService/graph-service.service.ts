import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  private selectedPlanDefinition = new BehaviorSubject<any>(null);

  setSelectedPlanDefinition(obj: any){
    this.selectedPlanDefinition.next(obj);
  }

  getSelectedPlanDefinition():Observable<any | null>{
    return this.selectedPlanDefinition.asObservable();
  }

  private url = 'http://localhost:8080';

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
