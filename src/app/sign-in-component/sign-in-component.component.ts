import { Component, OnInit } from '@angular/core';
import { authModel } from '../authModel.model'
import { Router} from '@angular/router'
import  { Observable,fromEvent } from 'rxjs' 
import { HttpClient } from '@angular/common/http';
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
  constructor(private router : Router,private http: HttpClient) { 
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
    if(this.username.trim() === "" || this.password.trim() === ""  || this.username === null || this.username === undefined || this.password === null || this.password === undefined){
      alert("Please enter username and password");
      return;
    }
    this.http.post<any>('http://localhost:3000/users/signin/',{username : this.username.trim(),password:this.password.trim()}).subscribe(data =>{
        if(data.signed === '0'){
          alert('Unable to SignIn Please Check your credentials');
        } else if(data.signed === '1'){
          localStorage.setItem(this.username,"true");
          localStorage.setItem("token",data.token); 
          this.router.navigate(['todo',this.username]);
        } else{
          alert('Error in Signing In');
        }
      }, (response) =>{
        alert('Error in Signing In');
    });
  }
  
  toggleFieldType() {
    this.fieldType = !this.fieldType;
  }

}
