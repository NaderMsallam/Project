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
  lastName:string;
  email: string;
  password:string;
  phone: number;
  id:number;
  photo:string;
  role:string;
  address:{
    street:string;
    state:string;
    zip:number;
  }
}
export interface Item{
  title: string;
  price: number;
  description: string;
}