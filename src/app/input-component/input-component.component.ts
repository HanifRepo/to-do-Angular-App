import { Component, OnInit , Output ,EventEmitter, Input } from '@angular/core';

import {toDoModel} from '../list-component/toDoModel';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {
  @Input() username : string ;
  toDoValue : string ;
  @Output() toDoEvent = new EventEmitter<String>();
  constructor() { 
    this.toDoValue = "";
    this.username = "" ;
  }

  ngOnInit(): void {
  }

  addToDo() : void {
    if(this.toDoValue.trim() === "" || this.toDoValue === null || this.toDoValue === undefined){
      alert("Please write a ToDo");
      return;
    }
    if(this.toDoValue !== null && this.toDoValue !== ""){
      var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
      if(items_from_storage === null){
        this.toDoEvent.emit(this.toDoValue);
      } else {
        for(let i of items_from_storage){
          if(i.toDoValue === this.toDoValue.trim() && i.username === this.username){
            alert('Already in To-Do-List');
            return;
          }
        }
        this.toDoEvent.emit(this.toDoValue);
      }
    }
    this.toDoValue = "";
  }

}
