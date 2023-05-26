import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-value-set',
  templateUrl: './value-set.component.html',
  styleUrls: ['./value-set.component.css']
})
export class ValueSetComponent {
  valueSet: any;
  currentValueSet: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getValueSet().subscribe((valueSet) => {
      this.valueSet = valueSet;
    });
  }

  openAction(id: String) {
    this.graphService.getValueSetById(id).subscribe((valueSet) => {
      this.currentValueSet = JSON.parse(JSON.stringify(valueSet))
    });

  }
}
