import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerApiService } from '../server-api.service';
import { UserService } from '../user.service';
import {SocketioService} from '../socketio.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private router: Router, private api:ServerApiService,) {}

  ngOnInit(): void {
    // this.getUserByToken();
    
    this.user=this.userService.user;
   
    /* this.userService.user.subscribe((user:any)=>{
      this.user=user;
      console.log(user);
      
    }); */
  }

  editUser() {
    
    this.router.navigate(['/edit']);
  }
  changePassword(){
    this.router.navigate(['/password']);
  }
  // getUserByToken(){
  //   this.api.getUserByToken().subscribe((res)=>{
  //     this.userService.user=res;
  //      this.user=res;
  //      console.log('heereeeee');
  //        console.log(res);
          
  //    },(err)=>{
  //      console.log(err);
       
  //    })
  // }
}
