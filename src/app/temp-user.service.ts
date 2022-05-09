import { Injectable } from '@angular/core';
import { User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class TempUserService {
  user!:User;
  AccessedByAdmin: boolean= false;
  constructor() { }
  setUser(user:User){
    this.user=user;
    this.AccessedByAdmin=true;
  }
}
