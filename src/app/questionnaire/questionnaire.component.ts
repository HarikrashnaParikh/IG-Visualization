import { Component } from '@angular/core';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  questionnaire: any;
  currentQuestionnaire: any;
  selectedId: any;
  constructor(private graphService: GraphServiceService) {}

  ngOnInit(): void {
    this.graphService.getQuestionnaire().subscribe((questionnaire) => {
      this.questionnaire = questionnaire;
      console.log(this.questionnaire);

    });
  }

  openAction(id: String) {
    this.selectedId = id;
    this.graphService.getQuestionnaireById(id).subscribe((questionnaire) => {
      this.currentQuestionnaire = JSON.parse(JSON.stringify(questionnaire))
    });

  }
}
