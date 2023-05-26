import { Component, OnInit } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent  implements OnInit{

  ids!: string[]

  constructor(private graphService: GraphServiceService){}

  ngOnInit(): void {
    this.graphService.getActions().subscribe(actions => {
      // for(let action of actions){

      // }
      console.log(actions);

    })
  }
}
