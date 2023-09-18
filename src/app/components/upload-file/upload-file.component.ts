import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphServiceService } from 'src/app/services/graphService/graph-service.service';
import { NotificationService } from 'src/app/services/toaster/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})

export class UploadFileComponent {
  file!: File;
  isDragOver = false;
  fileName!: string;
  constructor(private http: HttpClient, 
              private router: Router,
              private graphService: GraphServiceService,
              private notificationService: NotificationService,
              private toastr:ToastrService
              ) {}

  onSubmit() {
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('bundle', this.file, this.file.name);

      this.http.post('https://igvisualization-web-production.up.railway.app/file-upload', formData)
        .subscribe({
          next: (response) => {
            // console.log("====",response);
          },
          error: (error) => {
            this.toastr.error(error.error.data,"Oops..")
            // console.error('Error occurred during file upload:', error);
          },
          complete: () => {
            // this.notificationService.showToast("success","Welcome to IG Visualization","File upload successfully !!")
            this.toastr.success("File upload successfully !!","Welcome to IG Visualization,")
            this.router.navigate(['graph']);
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