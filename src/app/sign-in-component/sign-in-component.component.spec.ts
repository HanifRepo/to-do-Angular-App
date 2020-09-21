import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponentComponent } from './sign-in-component.component';
import { FormsModule } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router'
import { fromEvent} from 'rxjs';
import { RegistrationComponentComponent } from '../registration-component/registration-component.component'
import { WholeContainerComponent } from '../whole-container/whole-container.component'

describe('SignInComponentComponent', () => {
  let component: SignInComponentComponent;
  let fixture: ComponentFixture<SignInComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [ SignInComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Sign In Test Successfull',() => {
  let component: SignInComponentComponent;
  let fixture: ComponentFixture<SignInComponentComponent>;
  let username : string = "qwerty";
  let password : string = "Hi";
  var signInButton: HTMLButtonElement;
  var hostElement; 
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path : 'todo/:username' , component: WholeContainerComponent},
        {path : 'sign_up' ,component: RegistrationComponentComponent}
    ]),FormsModule],
      declarations: [ SignInComponentComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponentComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    signInButton = hostElement.querySelector('.sign_in');
  });
  it('Sign In should result in To-Do-Page', () => {
    component.username = "qwerty";
    component.password = "Hi";
    let location: Router ;
    location = TestBed.inject(Router);
    let currentRoute : string;
    currentRoute = location.url;
    location.events
    .subscribe((event: any) => {
      currentRoute = event.url;
    });
    signInButton.click();
    expect(currentRoute).toBe("/todo/"+component.username);
  });
  it('Sign In should alert', () => {
    spyOn(window, "alert");
    component.username = "sdafas";
    component.password = "sda3wqw";
    signInButton.click();
    expect(window.alert).toHaveBeenCalledWith('No such user');
  });   

  it('Test for empty username and password', () => {
    spyOn(window, "alert");
    component.username = "";
    component.password = "";
    signInButton.click();
    expect(window.alert).toHaveBeenCalledWith('No such user');
  });   

  it('Test for space username and password', () => {
    spyOn(window, "alert");
    component.username = " ";
    component.password = " ";
    signInButton.click();
    expect(window.alert).toHaveBeenCalledWith('No such user');
  });   

  it('Route to signUp', () => {
    signInButton=hostElement.querySelector('.registration_link');
    var addClick = fromEvent(signInButton,'click');
    let location: Router ;
    location = TestBed.inject(Router);
    addClick.subscribe(
      function(e){
        location.navigate(['sign_up']);
      },function(error){
        console.log('Error')
      },function(){
        console.log('Completed')
      }
    );
    let currentRoute : string;
    currentRoute = location.url;
    location.events
    .subscribe((event: any) => {
      currentRoute = event.url;
    });
    signInButton.click();
    expect(currentRoute).toBe('/sign_up')
  });

});

