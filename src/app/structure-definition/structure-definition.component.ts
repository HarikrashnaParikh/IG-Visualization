import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent {
  structureDefinition: any;
  currentStructureDefinition: any;
  selectedId: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    // this.graphService.getStructureDefinition().subscribe((structureDefinition) => {
    //   this.structureDefinition = structureDefinition;

    // });
  }

  openAction(id: String) {
    this.selectedId = id;
    // this.graphService.getStructureDefinitionById(id).subscribe((structureDefinition) => {
    //   this.currentStructureDefinition = JSON.parse(JSON.stringify(structureDefinition))
    // });

  }
}
