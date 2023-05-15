import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  private url = 'http://localhost:8080/planDefinition';

  constructor(private httpClient: HttpClient) {}

  getPlanDefinition(){  
    return this.httpClient.get(this.url);
  }
}
