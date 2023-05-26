import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inHome!: boolean;

  constructor(
    private router: Router
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        let name = (<any>event).url.split('/').slice(-1)[0];
        if (name === 'home' || name === '') {
          this.inHome = true;
        } else {
          this.inHome = false;
        }
      }
    });
  }
  title = 'IGVisualization-UI';
}
