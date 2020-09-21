import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponentComponent } from './input-component.component';
import { FormsModule } from '@angular/forms';
import { SignInComponentComponent } from '../sign-in-component/sign-in-component.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WholeContainerComponent } from '../whole-container/whole-container.component'
import { ComponentRef } from '@angular/core';
import { EventEmitter } from 'protractor';
describe('InputComponentComponent', () => {
  let component: InputComponentComponent;
  let fixture: ComponentFixture<InputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,RouterTestingModule.withRoutes([
        {path : 'todo/:username' , component: WholeContainerComponent},
      ])],
      declarations: [ InputComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test Empty To Do', () => {
    spyOn(window, "alert");
    component.toDoValue = "";
    component.username = "Loveesoreey123";
    var event = new KeyboardEvent('keyup',{ key : 'Enter'})
    var hostElement = fixture.nativeElement;
    var textHolder = hostElement.querySelector(".text_holder");
    textHolder.dispatchEvent(event);
    expect(window.alert).toHaveBeenCalledWith('Please write a ToDo');
  });

  it('Test Space To Do', () => {
    spyOn(window, "alert");
    component.toDoValue = "  ";
    component.username = "Loveesoreey123";
    var event = new KeyboardEvent('keyup',{ key : 'Enter'})
    var hostElement = fixture.nativeElement;
    var textHolder = hostElement.querySelector(".text_holder");
    textHolder.dispatchEvent(event);
    expect(window.alert).toHaveBeenCalledWith('Please write a ToDo');
  });

  it('Test Original To Do', () =>{
    spyOn(component.toDoEvent , 'emit');
    component.toDoValue = "Hi";
    component.username = "Loveesoreey123";
    var event = new KeyboardEvent('keyup',{ key : 'Enter'})
    var hostElement = fixture.nativeElement;
    var textHolder = hostElement.querySelector(".text_holder");
    textHolder.dispatchEvent(event);
    expect(component.toDoEvent.emit).toHaveBeenCalledWith("Hi");
  });
});
