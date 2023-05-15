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
  allData: any= [];
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
          children: [],
        },
      ];
      this.allData = response.action
      console.log("FDSFDSHDOHFDSIHDFDFSIH......."+this.allData[0].id);
      for(let data of this.allData){
        this.data[0].children?.push({
          expanded: true,
          type: 'person',
          styleClass: 'bg-blue-500 text-white',
          data: {
            id: data.id,
            description: data.description,
            definitionCanonical: data.definitionCanonical
          }
        })
      }
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