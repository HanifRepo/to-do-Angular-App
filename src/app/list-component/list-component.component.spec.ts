import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponentComponent } from './list-component.component';
import { FormsModule } from '@angular/forms';
import { toDoModel } from './toDoModel'

describe('ListComponentComponent', () => {
  let component: ListComponentComponent;
  let fixture: ComponentFixture<ListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [ ListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('ListComponentComponent', () => {
  let component: ListComponentComponent;
  let fixture: ComponentFixture<ListComponentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [ ListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should append to the list followed by Completing It', () => {
    component.username = "qwerty";
    component.addtoDoItem(component.username,"uncompleted");
    let element = fixture.nativeElement;
    var unoderedList = element.querySelector('ul');
    expect(unoderedList.childNodes.length).toBe(1);
    component.completedSingleItem("qwerty");
    var items_from_storage : toDoModel[] = JSON.parse(localStorage.getItem("item_names"));
    var complete : string
    for(let i of items_from_storage){
      if(i.toDoValue === "qwerty"){
        complete = i.isCompleted;
      }
    }
    expect(complete).toBe("completed");
  });

});
