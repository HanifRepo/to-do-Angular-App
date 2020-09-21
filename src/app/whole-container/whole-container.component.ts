import { Component, OnInit, ViewChild } from '@angular/core';
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
    var items_from_storage : authModel[] = JSON.parse(localStorage.getItem('auth'));
    if(items_from_storage !==null){
      for(let i of items_from_storage){
        if(i.username === this.username && i.isLogged ===false){
          this.route.navigate(['/']);
        }
      }
    }else{
      this.route.navigate(['/']);
    }
  }

  getToDoValue($event) { 
    this.toDoValue = $event;
  }

  logOut() : void  {
    var items_from_storage : authModel[] = JSON.parse(localStorage.getItem('auth'));
    for(let i of items_from_storage){
     if(i.username === this.username && i.isLogged ===true){
       i.isLogged =false;
       localStorage.setItem('auth',JSON.stringify(items_from_storage));
       this.route.navigate(['/']);
       return;
     }
   }
  }

}
