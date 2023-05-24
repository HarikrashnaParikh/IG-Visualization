import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  file!: File;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Hello');
    // const formData = new FormData();
    // formData.append("file",this.file);
    // this.http.post('http://localhost:8080/file-upload',formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
    
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('bundle', this.file, this.file.name);

      this.http.post('http://localhost:8080/file-upload', formData)
        .subscribe(
          (response) => {
            console.log(response);
            // Handle success message or redirect to another page
          },
          (error) => {
            console.error('Error occurred during file upload:', error);
            // Handle error message or display an error alert
          }
          );
          this.router.navigate(['/visualization']);
    }

  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  } 
}
