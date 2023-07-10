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
  selectedId: any;
  pdId!: string;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getActions(this.pdId).subscribe((actions) => {
      this.actions = actions;
    });
  }

  openAction(action: any) {
    this.selectedId = action;
    this.graphService.getActionById(this.pdId,action).subscribe((actionData) => {
      // Handle action retrieval
      this.currentAction = JSON.parse(JSON.stringify(actionData));
    });
  }
}
