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
  children=[];  
  data!: TreeNode[] ;
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
          children: [
            {
              expanded: true,
              type: 'person',
              styleClass: 'bg-purple-500 text-white ',
              data: {
                id: this.childData(this.i,this.posts),
              },
              children: [
                {
                  label: 'Sales',
                  styleClass: 'bg-purple-500 text-white',
                  style: ' border-radius: 12px',
                },
                {
                  label: 'Marketing',
                  styleClass: 'bg-purple-500 text-white',
                  style: ' border-radius: 12px',
                },
              ],
            },
            {
              expanded: true,
              type: 'person',
              styleClass: 'bg-teal-500 text-white',
              data: {
                id: this.childData(this.i,this.posts),

              },
              children: [
                {
                  label: 'Development',
                  styleClass: 'bg-teal-500 text-white',
                },
                {
                  label: 'UI/UX Design',
                  styleClass: 'bg-teal-500 text-white',
                },
              ],
            },
          ],
        },
      ];
    });
  }
  childData(i: number,posts: any) {
    let id = posts.action[i].id;
    console.log("inside function id value : "+id)
    this.i=++i;
    console.log(this.i);
    
    return id;
  }


} 