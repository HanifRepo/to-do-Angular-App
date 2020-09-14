import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { toDoModel } from './toDoModel' ;
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit , OnChanges {
  @Input() toDoValue : string ; 
  @Input() username : string ;
  list : toDoModel[] ;
  itemLeft : string ;
  deleteButtonState : string ;
  backupList : toDoModel[] ;
  deleteTimer;
  clearTimer;
  singleDeleteTimer;
  undoState : boolean ;
  constructor(private router : Router) { 
    this.toDoValue = "";
    this.list = [] ;
    this.deleteButtonState = "Delete";
    this.backupList = [];
    this.undoState = false;
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
        if(toDoValues.username === this.username){
          this.list.push(toDoValues);
        }
      }
    }
    this.itemsLeft();
  }

  activeList() :void {
    this.list = [];
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      for(let toDoValues of items_from_storage){
        if(toDoValues.isCompleted === "uncompleted" && toDoValues.username === this.username){
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
        if(toDoValues.isCompleted === "completed" && toDoValues.username === this.username){
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
        if(toDoValues.isCompleted === "uncompleted" && toDoValues.username === this.username){
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
      isChecked : false,
      username : this.username
    };
    this.list.push(item);
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage !== null){
      const to_insert : toDoModel = {
        toDoValue : toDo ,
        isCompleted : isCompletedParam,
        isChecked : false,
        username : this.username
      };
      items_from_storage[items_from_storage.length] = to_insert ;
      localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    } else {
      const to_insert : toDoModel = {
        toDoValue : toDo ,
        isCompleted : isCompletedParam,
        isChecked : false,
        username : this.username
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
        if(i.toDoValue === j.toDoValue && j.isCompleted === "uncompleted" && i.isChecked === true && i.username === j.username){
          j.isCompleted = "completed";
          j.isChecked = false ;
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
      this.undoState = true ;
      this.backupList = this.list;
      this.list = this.list.filter(item => item.isChecked !== true);
      this.deleteTimer = setTimeout(() => this.permanentDelete(),5000);
    }else{
      this.deleteButtonState = "Delete";
      this.list = this.backupList;
      this.undoState = false ;
      clearTimeout(this.deleteTimer);
    }
  }

  permanentDelete() : void {
    this.undoState = false ;
    this.deleteButtonState = "Delete";
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    var localList : toDoModel[] = this.backupList;
    for(let i of localList){
      for(let j of items_from_storage){
        if(i.toDoValue === j.toDoValue && i.isChecked === true && i.username === this.username && i.username === j.username){
          items_from_storage.splice(items_from_storage.indexOf(j),1);
          break;
        }
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList();     
  }

  completedSingleItem(toDoName) : void{
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    for(let i of items_from_storage){
      if(i.toDoValue === toDoName && i.isCompleted === "uncompleted" && i.username === this.username){
        i.isCompleted = "completed";
        i.isChecked = false ;
        break;
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList();
  }

  deleteSingleItem(toDoName) : void {
    try{
    if(document.getElementById("   ").innerHTML === "UNDO"){
      clearTimeout(this.singleDeleteTimer);
      this.setupList();
      document.getElementById(toDoName).innerHTML = "Delete";
      this.undoState = false;
      return;
    }}catch(error){
    }
    if(this.undoState === true){
      alert("Aleady some To-Do in Undo State");
      return;
    } else {
      this.undoState = true;
      for(let i of this.list){
        if(i.toDoValue === toDoName){
          i.toDoValue = "   ";
          this.singleDeleteTimer = setTimeout(() => this.deleteSingleItemPermanently(toDoName),5000);
          document.getElementById(toDoName).innerHTML = "UNDO";
          return;
        }
      }
    }
  }

  deleteSingleItemPermanently(toDoName) : void {
    this.undoState = false ;
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    for(let i of items_from_storage){
      if(i.toDoValue === toDoName && i.username === this.username){
        items_from_storage.splice(items_from_storage.indexOf(i),1);
      }
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    this.setupList();
  }
}
