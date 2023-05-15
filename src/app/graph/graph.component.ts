import { Component, OnInit } from '@angular/core';
import {} from 'primeng';
import { TreeNode } from 'primeng/api';
import { GraphServiceService } from '../graph-service.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  posts: any = [];
  i: number = 0;
  isChildren:any = [];
  data!: TreeNode[];
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
            id: 'Plan Definition',
          },
          children:[]
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
  }
  childData(i: number, posts: any) {
    let actionId = posts.action[i].id;
    console.log('inside function id value : ' + actionId);
    this.i = ++i;
    console.log(this.i);
    const expanded= true;
    const type= 'person';
    const styleClass = 'bg-purple-500 text-white ';
    const data= {
      id: actionId 
    };
    // for (let i = 0; i < posts.length; i++) {
  //   this.data[0].children.push({
  //     expanded: true,
  //     type: 'child',
  //     styleClass: 'bg-blue-500 text-white',
  //     data: child,
  //     children: [],
  //   });
  // }  return this.isChildren;
  }

  isChild(action: any){
    for (const child of action) {
      this.data[0].children.push({
        expanded: true,
        type: 'child',
        styleClass: 'bg-blue-500 text-white',
        data: child.id,
        children: [],
      });
    }
  }
  

}