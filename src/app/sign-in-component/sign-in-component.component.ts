import { Component, OnInit } from '@angular/core';
import { authModel } from '../authModel.model'
import { Router} from '@angular/router'
import  { Observable,fromEvent } from 'rxjs' 
@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent implements OnInit {
  username : string;
  password : string;
  fieldType :boolean;
  register$ : Observable<Event>;
  sign$ : Observable<Event>;
  constructor(private router : Router) { 
    this.username = "";
    this.password = "";
    this.fieldType = false;
  }

  ngOnInit(): void {
    this.initialize(this.router);
  }

  initialize(router) : void {
    var sign_up = document.getElementById('registration');
    this.register$ = fromEvent(sign_up,'click');
    this.register$.subscribe(
      function(e){
        router.navigate(['sign_up']);
      },function(error){
        console.log('Error')
      },function(){
        console.log('Completed')
      }
    );
  }
  authorize() : void{
    const items_from_storage : authModel[] = JSON.parse(localStorage.getItem('auth'));
    if(items_from_storage === null){
      alert('No such user');
      return;
    }
    if(this.username.trim() === "" || this.password.trim() === "" || this.username !== null && this.username !== undefined && this.password !== null && this.password !== undefined){
      for(let i of items_from_storage){
        if( i.username === this.username && i.password === this.password){
          i.isLogged = true;
          localStorage.setItem('auth',JSON.stringify(items_from_storage));
          this.router.navigate(['todo',this.username]);
          return;
        }
      }
    }
    alert('No such user');
    return;
  }

  registerationPage() : void{
    this.router.navigate(['sign_up']);
  }

  toggleFieldType() {
    this.fieldType = !this.fieldType;
  }

}
