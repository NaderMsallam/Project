import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { IsLoggedInService } from './is-logged-in.service';
import {Subject } from 'rxjs'
import { User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
 registered=new Subject();

  constructor(private api: ServerApiService, private isloggedIn: IsLoggedInService) { }

  login(user:any,callback:any) {
    console.log(user);
    this.api.login(JSON.stringify(user)).subscribe((res:any)=>{
      
      
      
      this.user=res;
      console.log("heereeeee");
      console.log(res);
      this.isloggedIn.setLoggedIn(true);
      callback(false,res)
    },(error)=>{
      callback(error,null)
    })
  }

   register(user:any,callback:any) {
    ( this.api.register(JSON.stringify(user))).subscribe((res:any)=>{
      console.log(res);
      this.registered.next(true);
      callback(null,res)
      
    },(error)=>{
      console.log(error);
      this.registered.next(false);
      callback(error,null)
    })
  }

   editUser(user:any,callback:any){  
     ( this.api.editUser(user)).subscribe((res)=>{
      console.log(res);
      callback(null,res);  
      this.user=user;    
    },(error)=>{
      console.log(error);
      callback(error,null)
      
    })
  }
}
