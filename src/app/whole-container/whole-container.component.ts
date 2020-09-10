import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-whole-container',
  templateUrl: './whole-container.component.html',
  styleUrls: ['./whole-container.component.css']
})
export class WholeContainerComponent implements OnInit {
  
  toDoValue : string ;

  constructor() { 
    this.toDoValue = "";
  }

  ngOnInit(): void {
  }

  getToDoValue($event) { 
    this.toDoValue = $event;
  }

}
