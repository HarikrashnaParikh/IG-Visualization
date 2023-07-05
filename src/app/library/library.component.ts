import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  library: any;
  currentLibrary: any;
  selectedId: any
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getLibrary().subscribe((library) => {
      this.library = library;
    });
  }

  openAction(id: String) {
    this.selectedId = id;
    this.graphService.getLibraryById(id).subscribe((library) => {
      this.currentLibrary = JSON.parse(JSON.stringify(library))
    });

  }
}
