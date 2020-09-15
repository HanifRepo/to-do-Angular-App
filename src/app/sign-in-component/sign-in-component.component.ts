import { Component, OnInit } from '@angular/core';
import { authModel } from '../authModel.model'
import { Router} from '@angular/router'
@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent implements OnInit {
  username : string;
  password : string;
  constructor(private router : Router) { 
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  authorize() : void{
    const items_from_storage : authModel[] = JSON.parse(localStorage.getItem('auth'));
    console.log(items_from_storage);
    if(items_from_storage === null){
      alert('No such user');
      return;
    }
    for(let i of items_from_storage){
      if(i.username === this.username && i.password === this.password){
        i.isLogged = true;
        localStorage.setItem('auth',JSON.stringify(items_from_storage));
        this.router.navigate(['todo',this.username]);
        return;
      }
    }
    alert('No such user');
    return;
  }

}
