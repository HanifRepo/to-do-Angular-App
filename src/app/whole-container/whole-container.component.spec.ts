import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WholeContainerComponent } from './whole-container.component';
import { FormsModule } from '@angular/forms';
import { SignInComponentComponent } from '../sign-in-component/sign-in-component.component';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
describe('WholeContainerComponent', () => {
  let component: WholeContainerComponent;
  let fixture: ComponentFixture<WholeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [ WholeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Logging Out Result', () => {
  let component: WholeContainerComponent;
  let fixture: ComponentFixture<WholeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path : ' ' , component : SignInComponentComponent}
      ]),FormsModule],
      declarations: [ WholeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Logging Out', () => {
    var logOutButton = fixture.nativeElement.querySelector('.logout_button');
    let location: Router ;
    location = TestBed.inject(Router);
    let currentRoute : string;
    currentRoute = location.url;
    location.events
    .subscribe((event: any) => {
      currentRoute = event.url;
    });
    component.username="qwerty";
    logOutButton.click();
    expect(currentRoute).toBe('/');
  });
  
});
