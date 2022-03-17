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

  loggedIn:boolean=false;
  constructor(private isloggedIn: IsLoggedInService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.isloggedIn.loginEvent.subscribe((login:any)=>{
      this.loggedIn=login;
    })
    
  }

  setLogout(){
    this.isloggedIn.setLoggedIn(false);
  }

  
}
