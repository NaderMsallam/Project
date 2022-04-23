import { Component, OnInit } from '@angular/core';
import { IsLoggedInService } from '../is-logged-in.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ServerApiService } from '../server-api.service';
import {ShopCartService} from '../shop-cart.service';
import {SocketioService} from '../socketio.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  loggedIn: boolean = false;
  constructor(
    private isloggedIn: IsLoggedInService,
    private router: Router,
    private userService: UserService, 
    private api:ServerApiService,
    private ShopCartService:ShopCartService,
    private socketService:SocketioService,
  ) {}

  ngOnInit(): void {
    this.isloggedIn.loginEvent.subscribe((login: any) => {
      this.loggedIn = login;
      if (this.userService.user.role == 'Admin') this.isAdmin = true;
    });
  }

  setLogout() {
    this.api.logout().subscribe((res)=>{
      console.log("fat logout");
      
      console.log(res);
    });
    
    this.isloggedIn.setLoggedIn(false);
    this.isAdmin=false;
    this.ShopCartService.emptyCart();
    this.socketService.disconnect();
  }
  
}
