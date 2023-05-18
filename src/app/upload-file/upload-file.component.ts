import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  file!: File;

  constructor(private http: HttpClient,private router: Router){}

  onSubmit(){ 
    console.log("Hello");
    this.router.navigate(["/visualization"]);
    
  }
  onFileSelected(event: any){
    console.log("in the File Selection");
    this.file = event.target.files[0];
    console.log("The End");
  }

}
