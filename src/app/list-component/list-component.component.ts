import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { toDoModel } from './toDoModel' ;
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  token : string;
  constructor(private router : Router,private http: HttpClient) { 
    this.toDoValue = "";
    this.list = [] ;
    this.deleteButtonState = "Delete";
    this.backupList = [];
    this.undoState = false;
    this.token ="";
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.setupList();
    
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.toDoValue.currentValue !== "" && changes.toDoValue.currentValue !== null){
      const item : toDoModel = {
        toDoValue : changes.toDoValue.currentValue ,
        isCompleted : "uncompleted",
        isChecked : false,
        username : this.username
      };
      this.list.push(item);
    }
  }

  setupList() : void {
    var itemRemaining : number = 0;
    this.toDoValue = "";
    this.list = [] ;
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/setuplist',{username : this.username.trim()},{headers:header}).subscribe(data =>{
      if(data.status === 'empty'){
      } else {
        for(let i of data){
          let dataMap = new Map(Object.entries(i));
          var boolVal : string  = JSON.stringify(dataMap.get('ischecked'));
          boolVal = boolVal.substring(1,boolVal.length-1);
          var ischecked : boolean = boolVal.toLowerCase() === "true";
          var iscompleted : string =  JSON.stringify(dataMap.get('iscompleted'));
          iscompleted = iscompleted.substring(1,iscompleted.length-1);
          var todo : string =  JSON.stringify(dataMap.get('todoValue'));
          todo = todo.substring(1,todo.length-1);
          const toInsert : toDoModel ={
            toDoValue: todo,
            isCompleted: iscompleted,
            isChecked: ischecked,
            username: this.username
          }
          if(dataMap.get('iscompleted') === "uncompleted"){
            itemRemaining += 1;
          }
          this.list.push(toInsert);
        }
      }
    },
    ()=>{},
    () =>{
      this.itemsLeft(itemRemaining);
    });
  }

  activeList() :void {
    var itemRemaining : number = 0;
    this.toDoValue = "";
    this.list = [] ;
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/setuplist',{username : this.username.trim()},{headers:header}).subscribe(data =>{
      if(data.status === 'empty'){
      } else {
        for(let i of data){
          let dataMap = new Map(Object.entries(i));
          var boolVal : string  = JSON.stringify(dataMap.get('ischecked'));
          boolVal = boolVal.substring(1,boolVal.length-1);
          var ischecked : boolean = boolVal.toLowerCase() === "true";
          var iscompleted : string =  JSON.stringify(dataMap.get('iscompleted'));
          iscompleted = iscompleted.substring(1,iscompleted.length-1);
          var todo : string =  JSON.stringify(dataMap.get('todoValue'));
          todo = todo.substring(1,todo.length-1);
          if(iscompleted === "uncompleted"){
            const toInsert : toDoModel ={
              toDoValue: todo,
              isCompleted: iscompleted,
              isChecked: ischecked,
              username: this.username
            }
            itemRemaining += 1;
            this.list.push(toInsert);
          }
        }
      }
    },
    ()=>{},
    () =>{
      this.itemsLeft(itemRemaining);
    });
  }

  checkedList() :void {
    var itemRemaining : number = 0;
    this.toDoValue = "";
    this.list = [] ;
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/setuplist',{username : this.username.trim()},{headers:header}).subscribe(data =>{
      if(data.status === 'empty'){
      } else {
        for(let i of data){
          let dataMap = new Map(Object.entries(i));
          var boolVal : string  = JSON.stringify(dataMap.get('ischecked'));
          boolVal = boolVal.substring(1,boolVal.length-1);
          var ischecked : boolean = boolVal.toLowerCase() === "true";
          var iscompleted : string =  JSON.stringify(dataMap.get('iscompleted'));
          iscompleted = iscompleted.substring(1,iscompleted.length-1);
          var todo : string =  JSON.stringify(dataMap.get('todoValue'));
          todo = todo.substring(1,todo.length-1);
          if(iscompleted === "completed"){
            const toInsert : toDoModel ={
              toDoValue: todo,
              isCompleted: iscompleted,
              isChecked: ischecked,
              username: this.username
            }
            this.list.push(toInsert);
          }else{
            itemRemaining += 1;
          }
        }
      }
    },
    ()=>{},
    () =>{
      this.itemsLeft(itemRemaining);
    });
  }

  itemsLeft(itemRemaining: number) : void {
    if(itemRemaining >0){
      (itemRemaining > 1) ? this.itemLeft = ""+itemRemaining+" items left" : this.itemLeft = ""+itemRemaining+" item left" 
    } else{
      this.itemLeft = "0 item Left"
    }
  }
  
  changeSpanState(item : toDoModel) : void {
    item.isChecked = (item.isChecked === true) ? false : true ; 
  }

  completedSingleItem(toDoName) : void{
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/completesingleitem',{username : this.username.trim(),todovalue: toDoName},{headers:header}).subscribe(data =>{
    },
    ()=>{
      alert('Error in Completing');
    },
    () =>{
      this.setupList();
    });
  }

  deleteSingleItem(toDoName) : void {
    try{
    if(document.getElementById("   ").innerHTML === "UNDO"){
      clearTimeout(this.singleDeleteTimer);
      this.setupList();
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
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/deletesingleitem',{username : this.username.trim(),todovalue: toDoName},{headers:header}).subscribe(data =>{
    },
    ()=>{
      alert('Error in deleting');
    },
    () =>{
      this.setupList();
    });
  }

  setCompleted() : void {
    var localList : toDoModel[] = this.list;
    var upList :string[]=[];
    for(let i of localList){
      if(i.isChecked === true && i.isCompleted === "uncompleted"){
        upList.push(i.toDoValue);
      }
    }
    console.log(upList);
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/completebatchitem',{username : this.username.trim(),todovalues: upList},{headers:header}).subscribe(data =>{
    },
    ()=>{
      alert('Error in Completing the batch of To-Do');
    },
    () =>{
      this.setupList();
    });
  }

  deleteToDos() : void {
    if(this.deleteButtonState === "Delete"){
      this.deleteButtonState = "Undo";
      this.undoState = true ;
      this.backupList = this.list;
      var toDelete = this.list.filter(item => item.isChecked !== false);
      this.list = this.list.filter(item => item.isChecked !== true);
      this.deleteTimer = setTimeout(() => this.permanentDelete(toDelete),5000);
    }else{
      this.deleteButtonState = "Delete";
      this.list = this.backupList;
      this.undoState = false ;
      clearTimeout(this.deleteTimer);
    }
  }

  permanentDelete(toDelete: toDoModel[]) : void {
    this.undoState = false ;
    this.deleteButtonState = "Delete";
    var upList :string[]=[];
    for(let i of toDelete){
      upList.push(i.toDoValue);
    }
    const header = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>('http://localhost:3000/listhandler/deletebatchitem',{username : this.username.trim(),todovalues: upList},{headers:header}).subscribe(data =>{
    },
    ()=>{
      alert('Error in Deleting the batch of To-Do');
    },
    () =>{
      this.setupList();
    });
  }

}
