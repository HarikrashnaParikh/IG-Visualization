import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})

export class UploadFileComponent {
  file!: File;
  isDragOver = false;
  fileName!: string;
  constructor(private http: HttpClient, private router: Router,private graphService: GraphServiceService) {}

  onSubmit() {
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('bundle', this.file, this.file.name);

      this.http.post('http://localhost:8080/file-upload', formData)
        .subscribe({
          next: (response) => {
            console.log(response);
            // Handle success message or redirect to another page
          },
          error: (error) => {
            console.error('Error occurred during file upload:', error);
            // Handle error message or display an error alert
          },
          complete: () => {
            this.router.navigate(['planDefinition']);
          }
        });
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    localStorage.setItem("fileName", this.fileName);
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  private handleFiles(files: FileList) {
    if (files.length > 0) {
      this.file = files[0];
    }
  }
}