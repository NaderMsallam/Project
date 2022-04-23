import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  
  title = 'exercise';
  
  constructor(private socketService: SocketioService) {}
  
  ngOnInit() {
    
  }

  ngOnDestroy() {
   
  }
}
export interface User{
  name: string;
  email: string;
  phone: number;
}