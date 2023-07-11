import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent {
  structureMap: any;
  currentTarget: any;
  selectedId: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    // this.graphService.getStructureMap().subscribe((structureMap) => {
    //   this.structureMap = structureMap;
    // });
  }

  openAction(id: String) {
    this.selectedId= id;
    // this.graphService.getTargetById(id).subscribe((target) => {
    //   this.currentTarget = JSON.parse(JSON.stringify(target))
    // });

  }
}
