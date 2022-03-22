import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempUserService {
  user:any;
  AccessedByAdmin: boolean= false;
  constructor() { }
  setUser(user:any){
    this.user=user;
    this.AccessedByAdmin=true;
  }
}
