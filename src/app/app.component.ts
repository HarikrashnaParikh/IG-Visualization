import { Component } from '@angular/core';
import { GraphServiceService } from './graph-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inHome!: boolean
  constructor(private graphService: GraphServiceService){
    if(window.location.href.includes('home')){
      graphService.inHome.next(true)
    }
    this.graphService.inHome.subscribe(value => this.inHome = value)
  }
  title = 'IGVisualization-UI';


}
