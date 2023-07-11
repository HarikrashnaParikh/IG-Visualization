import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-code-system',
  templateUrl: './code-system.component.html',
  styleUrls: ['./code-system.component.css']
})
export class CodeSystemComponent {
  codeSystem: any;
  currentCodeSystem: any;
  selectedId : any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getCode().subscribe((codeSystem) => {
      this.codeSystem = codeSystem;
    });
  }

  openAction(id: String) {
    this.selectedId = id;
    this.graphService.getCodeById(id).subscribe((code) => {
      this.currentCodeSystem = JSON.parse(JSON.stringify(code))
    });

  }

}
