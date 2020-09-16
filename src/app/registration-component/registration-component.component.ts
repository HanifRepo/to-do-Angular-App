import { Component, OnInit } from '@angular/core';
import { authModel } from '../authModel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit {
  username : string;
  password : string;
  fieldType : boolean;
  constructor(private router : Router) { 
    this.username ="";
    this.password ="";
    this.fieldType = false;
  } 

  ngOnInit(): void {
  }

  register() : void {
    if(this.username.trim() === "" || this.password.trim() === ""){
      alert("Please enter username and password");
      return;
    }
    var items_from_storage : authModel[] = JSON.parse(localStorage.getItem('auth'));
    if(items_from_storage === null){
      let items_to_storage : authModel[] = [];
      let to_insert : authModel = {
        username : this.username.trim(),
        password : this.password.trim(),
        isLogged : false
      };
      items_to_storage.push(to_insert);
      localStorage.setItem('auth',JSON.stringify(items_to_storage));
      alert(' New User Registered');
      this.router.navigateByUrl('/');
      return;
    } else {
      for(let i of items_from_storage){
        if(i.username === this.username){
          alert('Username already used');
          return;
        }
      }
    }
    let to_insert : authModel = {
      username : this.username.trim(),
      password : this.password.trim(),
      isLogged : false
    };
    items_from_storage.push(to_insert);
    localStorage.setItem('auth',JSON.stringify(items_from_storage));
    alert(' New User Registered');
    this.router.navigateByUrl('/');
    return;
  }

  signInPage() : void{
    this.router.navigate([' ']);
  }

  toggleFieldType() {
    this.fieldType = !this.fieldType;
  }
  
}
