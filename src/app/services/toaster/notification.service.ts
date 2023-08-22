import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  showToast(severity: string,summary: string,detail: string){
    console.log("hehe lol");
    
    this.messageService.add({severity: severity,summary: summary,detail: detail, life: 3000});
  }

  
}
