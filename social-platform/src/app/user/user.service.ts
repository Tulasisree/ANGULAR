import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    {id:1,name:"Tulasi"},
    {id:2,name:"Malli"},
    {id:3,name:"Pavan"}
  ]
  constructor() { }

  getUsers(){
    return of(this.users);
  }
}
