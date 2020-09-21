import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponentComponent } from './registration-component.component';
import { FormsModule } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SignInComponentComponent } from '../sign-in-component/sign-in-component.component'
describe('RegistrationComponentComponent', () => {
  let component: RegistrationComponentComponent;
  let fixture: ComponentFixture<RegistrationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RegistrationComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Resistration Test Successfull',() => {
  let component: RegistrationComponentComponent;
  let fixture: ComponentFixture<RegistrationComponentComponent>;
  let username : string = "qwerty";
  let password : string = "Hi";
  var registerButton: HTMLButtonElement;
  var hostElement; 
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path : ' ' , component : SignInComponentComponent}
      ]),FormsModule],
      declarations: [ RegistrationComponentComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponentComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    registerButton = hostElement.querySelector('.sign_up');
  });
  it('Register should result in Sign In Page', () => {
    spyOn(window, "alert");
    component.username = "qwertyeee";
    component.password = "Hieeee";
    let location: Router ;
    location = TestBed.inject(Router);
    let currentRoute : string;
    currentRoute = location.url;
    location.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      currentRoute = event.url;
    });
    registerButton.click();
    expect(window.alert).toHaveBeenCalledWith(' New User Registered');
    expect(currentRoute).toBe("/");
  });
  it('Registration should alert', () => {
    spyOn(window, "alert");
    component.username = "qwerty";
    component.password = "Hi";
    registerButton.click();
    expect(window.alert).toHaveBeenCalledWith('Username already used');
  });   

  it('Test for empty username and password', () => {
    spyOn(window, "alert");
    component.username = "";
    component.password = "";
    registerButton.click();
    expect(window.alert).toHaveBeenCalledWith('Please enter username and password');
  });   

  it('Test for space username and password', () => {
    spyOn(window, "alert");
    component.username = " ";
    component.password = " ";
    registerButton.click();
    expect(window.alert).toHaveBeenCalledWith('Please enter username and password');
  });   

  it('Route to signIn', () => {
    registerButton=hostElement.querySelector('.signin_link');
    let location: Router ;
    location = TestBed.inject(Router);
    let currentRoute : string;
    currentRoute = location.url;
    location.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      currentRoute = event.url;
    });
    registerButton.click();
    expect(currentRoute).toBe('/')
  });

});
