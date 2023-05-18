import { Component, OnInit } from '@angular/core';
import {} from 'primeng';
import { TreeNode } from 'primeng/api';
import { GraphServiceService } from '../graph-service.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit {
  posts: any = [];
  actions: any = [];
  questionnaire: any =[];
  i: number = 0;
  children = [];
  data!: TreeNode[];
  allData: any = [];
  constructor(private graphService: GraphServiceService) {}
  ngOnInit() {
    this.graphService.getPlanDefinition().subscribe((response: any) => {
      this.posts = response;
      console.log(this.posts);
      this.data = [
        {
          expanded: true,
          type: 'person',
          styleClass: 'bg-indigo-500 text-white',
          data: {
            id: this.posts.id,
          },
          children: [],
        },
      ];
      const childrenData = this.posts.action;
      console.log(JSON.stringify(childrenData));
      // this.isChild(childrenData);
      if (this.data && this.data[0]?.children) {
        this.data[0].children.push({
          expanded: true,
          type: 'child',
          styleClass: 'bg-blue-500 text-white',
          data: {
            id: 'Child 1',
          },
        });
      
    });

    this.graphService.getActions().subscribe((response: any) => {
      this.actions = response;
      console.log(this.actions);
      this.allData = response;
      console.log('FDSFDSHDOHFDSIHDFDFSIH.......' + this.allData[0].id);
      for (let data of this.allData) {
        this.data[0].children?.push({
          expanded: false,
          type: 'person',
          styleClass: 'bg-blue-500 text-white',
          data: {
            id: data.id,
            description: data.description,
            definitionCanonical: data.definitionCanonical

          },
          children:[]
        });
      }
      this.graphService.getQuestionnaire().subscribe((response: any) =>{
        this.questionnaire = response;
        console.log("Helllo this is questionnaire"+JSON.stringify(this.questionnaire));
        console.log("Hehehehehehhe............"+JSON.stringify(this.data));
        this.data[0].children[0].children?.push({
          expanded: true,
          type: 'person',
          styleClass: 'bg-blue-500 text-white',
          data: {
            id: this.questionnaire.id
          },
          children:[]
        });
        
        
      })  

      
    });
  }
  // childData(i: number,posts: any) {
  //   let id = posts.action[i].id;
  //   console.log("inside function id value : "+id)
  //   this.i=++i;
  //   console.log(this.i);

  //   return id;
  // }
}
