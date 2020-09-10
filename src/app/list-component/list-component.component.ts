import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { toDoModel } from './toDoModel' ;
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit , OnChanges {
  @Input() toDoValue : string ; 
  list : toDoModel[] ;
  itemLeft : string ;
  deleteButtonState : string ;
  clearButtonState : string ;
  backupList : toDoModel[] ;
  deleteTimer;
  clearTimer;
  constructor() { 
    this.toDoValue = "";
    this.list = [] ;
    this.deleteButtonState = "Delete";
    this.clearButtonState = "Clear";
    this.backupList = [];
  }

  ngOnInit(): void {
    this.setupList();
    this.itemsLeft();
  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.toDoValue.currentValue !== "" && changes.toDoValue.currentValue !== null){
      this.addtoDoItem(changes.toDoValue.currentValue,"uncompleted");
    }
  }

  setupList() : void {
    this.toDoValue = "";
    this.list = [] ;
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      for(let toDoValues of items_from_storage){
        this.list.push(toDoValues);
      }
    }
    this.itemsLeft();
  }

  activeList() :void {
    this.list = [];
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      for(let toDoValues of items_from_storage){
        if(toDoValues.isCompleted === "uncompleted"){
          this.list.push(toDoValues);
        }
      }
    }
    this.itemsLeft();
  }

  checkedList() :void {
    this.list = [];
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      for(let toDoValues of items_from_storage){
        if(toDoValues.isCompleted === "completed"){
          this.list.push(toDoValues);
        }
      }
    }
    this.itemsLeft();
  }

  itemsLeft() : void {
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      var count : number = 0 ;
      for(let toDoValues of items_from_storage){
        if(toDoValues.isCompleted === "uncompleted"){
          count += 1;
        }
      }
      (count > 1) ? this.itemLeft = ""+count+" items left" : this.itemLeft = ""+count+" item left" 
    } else{
      this.itemLeft = "0 item Left"
    }
  }

  addtoDoItem(toDo : string , isCompletedParam : string) : void{
    const item : toDoModel = {
      toDoValue : toDo ,
      isCompleted : isCompletedParam,
      isChecked : false
    };
    this.list.push(item);
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      const to_insert : toDoModel = {
        toDoValue : toDo ,
        isCompleted : isCompletedParam,
        isChecked : false
      };
      items_from_storage[items_from_storage.length] = to_insert ;
      localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    } else {
      const to_insert : toDoModel = {
        toDoValue : toDo ,
        isCompleted : isCompletedParam,
        isChecked : false
      };
      var items_to_storage : toDoModel[] = [] ;
      items_to_storage.push(to_insert) ;
      localStorage.setItem("item_names",JSON.stringify(items_to_storage));
    }
    this.itemsLeft();
  }
  changeSpanState(item : toDoModel) : void {
    item.isChecked = (item.isChecked === true) ? false : true ; 
  }
  setCompleted() : void {
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    var localList : toDoModel[] = this.list;
    for(let i of localList){
      for(let j of items_from_storage){
        if(i.toDoValue === j.toDoValue && j.isCompleted === "uncompleted" && j.isChecked === false && i.isChecked === true){
          j.isCompleted = "completed";
          j.isChecked = true ;
          break;
        }
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList(); 
  }
  
  deleteToDos() : void {
    if(this.deleteButtonState === "Delete"){
      this.deleteButtonState = "Undo";
      this.backupList = this.list;
      this.list = this.list.filter(item => item.isChecked !== true && item.isCompleted !== "completed");
      this.deleteTimer = setTimeout(() => this.permanentDelete(),5000);
    }else{
      this.deleteButtonState = "Delete";
      this.list = this.backupList;
      clearTimeout(this.deleteTimer);
    }
  }

  permanentDelete() : void {
    this.deleteButtonState = "Delete";
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    var localList : toDoModel[] = this.backupList;
    for(let i of localList){
      for(let j of items_from_storage){
        if(i.toDoValue === j.toDoValue && j.isCompleted === "uncompleted" && i.isChecked === true){
          items_from_storage = items_from_storage.filter(item => item.toDoValue !== j.toDoValue);
          break;
        }
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList();     
  }

  clearCompletedToDos() : void {
    if(this.clearButtonState === "Clear"){
      this.clearButtonState = "Undo";
      this.backupList = this.list;
      this.list = this.list.filter(item => item.isChecked !== true && item.isCompleted !== "completed");
      this.clearTimer = setTimeout(() => this.permanentClear(),5000);
    }else{
      this.clearButtonState = "Clear";
      this.list = this.backupList;
      clearTimeout(this.clearTimer);
    }
  }

  permanentClear() : void {
    this.clearButtonState = "Clear";
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    var localList : toDoModel[] = this.backupList;
    for(let i of localList){
      for(let j of items_from_storage){
        if(i.toDoValue === j.toDoValue && j.isCompleted === "completed" && j.isChecked === true){
          items_from_storage = items_from_storage.filter(item => item.toDoValue !== j.toDoValue);
          break;
        }
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList();  
  }
}
