import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IsLoggedInService } from '../is-logged-in.service';
import { SocketioService } from '../socketio.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  loggedIn: boolean = false;
  user: any;
  orders:any;
  constructor(
    private socketService: SocketioService,
    private isloggedIn: IsLoggedInService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
   
    this.isloggedIn.loginEvent.subscribe((login: any) => {
      this.loggedIn = login;
      this.user = this.userService.user.name;
      
    });
    
    
  }
}
