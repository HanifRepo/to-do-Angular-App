import { Component, OnInit , Output ,EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {
  @Input() username : string ;
  toDoValue : string ;
  @Output() toDoEvent = new EventEmitter<String>();
  constructor(private http: HttpClient) { 
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
    this.http.post<any>('http://localhost:3000/listhandler/checkinput/',{username : this.username.trim(),toDoValue:this.toDoValue.trim()}).subscribe(data =>{
        if(data.status === 'repeated'){
          alert('Already in To-Do-List');
        } else if(data.status === 'signed'){
          this.toDoEvent.emit(this.toDoValue);
        } else{
          alert('Error in Adding To Do list');
        }
      }, (response) =>{
        alert('Error in Getting Response');
    }, () =>{
      this.toDoValue = "";
    });
  }

}
