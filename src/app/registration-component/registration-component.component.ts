import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit {
  username : string;
  password : string;
  fieldType : boolean;
  constructor(private router : Router,private http: HttpClient) { 
    this.username ="";
    this.password ="";
    this.fieldType = false;
  } 

  ngOnInit(): void {
  }

  register() : void {
    if(this.username.trim() === "" || this.password.trim() === ""  || this.username === null || this.username === undefined || this.password === null || this.password === undefined){
      alert("Please enter username and password");
      return;
    }
    var items_from_storage : string = JSON.parse(localStorage.getItem(this.username));
    if(items_from_storage === null){
      this.http.post<any>('http://localhost:3000/users/signup/',{username : this.username.trim(),password:this.password.trim()}).subscribe(data =>{
        if(data.registered === '0'){
          alert('Username already used');
          localStorage.setItem(this.username,"false");
        } else if(data.registered === '1'){
          alert('New User Registered');
          localStorage.setItem(this.username,"false"); 
          this.router.navigateByUrl('/');
        } else{
          alert('Error in creating new user');
        }
      }, (response) =>{
        alert('Error in creating new user');
      });
    } else {
      alert('Username already used');
    }
    return;
  }

  signInPage() : void{
    this.router.navigateByUrl('/');
  }

  toggleFieldType() {
    this.fieldType = !this.fieldType;
  }
  
}
