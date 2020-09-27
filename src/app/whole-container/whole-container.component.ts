import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router'
import { authModel } from '../authModel.model';
@Component({
  selector: 'app-whole-container',
  templateUrl: './whole-container.component.html',
  styleUrls: ['./whole-container.component.css']
})
export class WholeContainerComponent implements OnInit {
  
  toDoValue : string ;
  username : string ;
  constructor(private router : ActivatedRoute,private route : Router) { 
    this.toDoValue = "";
  }

  ngOnInit(): void {
    this.router.params.subscribe((params : Params) => {
     this.username = params['username'];
    });
    var items_from_storage  = localStorage.getItem(this.username);
    if(items_from_storage !== null){
      if(items_from_storage === "false"){
        this.route.navigate(['/']);
      }
    }else{
      this.route.navigate(['/']);
    }
  }

  getToDoValue($event) { 
    this.toDoValue = $event;
  }

  logOut() : void  {
    var items_from_storage = localStorage.getItem(this.username);
    if(items_from_storage === "true"){
      localStorage.setItem(this.username,"false");
      this.username="";
      this.route.navigate(['/']);
      return;
    }
  }

}
