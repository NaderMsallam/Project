import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:any;
  user:any;
  orders:any;
  constructor(private userService:UserService) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.emit('identify', this.userService.user.email);

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });

    this.socket.on('getAllOrders', (data: string) => {
      console.log('all orders from socket');
      console.log(data);
      this.orders=data;
      
    })

  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
