import { Component, OnInit } from '@angular/core';
import { IsLoggedInService } from '../is-logged-in.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  loggedIn:boolean=false;
  constructor(private isloggedIn: IsLoggedInService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.isloggedIn.loginEvent.subscribe((login:any)=>{
      this.loggedIn=login;
      if(this.userService.user.email=="Admin") this.isAdmin = true;
    })
    
  }

  setLogout(){
    this.isloggedIn.setLoggedIn(false);
  }

  
}
