import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInService {
  constructor() {}

  loggedIn: boolean = false;
  loginEvent = new Subject();

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    
    return this.loginEvent.next(loggedIn);
  }
  getLoggedIn() {
    
    
    return this.loggedIn;
  }
}
