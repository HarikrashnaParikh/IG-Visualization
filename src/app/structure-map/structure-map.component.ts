import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-structure-map',
  templateUrl: './structure-map.component.html',
  styleUrls: ['./structure-map.component.css']
})
export class StructureMapComponent {
  structureMap: any;
  currentStructureMap: any;
  selectedId: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getStructureMap().subscribe((structureMap) => {
      this.structureMap = structureMap;
      console.log(this.structureMap);

    });
  }

  openAction(id: String) {
    this.selectedId=id;
    this.graphService.getStructureMapById(id).subscribe((structureMap) => {
      this.currentStructureMap = JSON.parse(JSON.stringify(structureMap))
    });

  }
}
