import { Component, OnInit } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent implements OnInit {
  actions: any;
  currentAction: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getActions().subscribe((actions) => {
      this.actions = actions;
    });
  }

  openAction(id: String) {
    this.graphService.getActionById(id).subscribe((action) => {
      this.currentAction = JSON.parse(JSON.stringify(action))
    });

  }


}
