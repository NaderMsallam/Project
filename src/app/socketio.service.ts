import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  message:any;
  Message='';
  tempMessage='';
  MessageHistory=new Subject();
  placingOrder=new Subject();
  constructor(private userService:UserService) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.emit('identify', this.userService.user.email);

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
    
    
    this.socket.on('getAllOrders', (data: any) => {
      console.log('all orders from socket');
      console.log(data);
      console.log(Object.keys(data).length);
      this.Message=this.Message.concat('1 \n All Orders: \n')
      for(let i = 0; i < Object.keys(data).length ; i++){
       
        this.Message=this.Message.concat('email: '+ data[i].email+', date: '+data[i].date +'\n');
        for(let j = 0; j < data[i].order.length;j++){
          this.Message=this.Message.concat('title: '+data[i].order[j].title +"\n ");
        }
        
      }
      this.Message=this.Message.concat('\n \n')
      this.tempMessage+=this.Message;
      this.MessageHistory.next(this.tempMessage);
      this.Message='';
      console.log(this.Message);
    })


    this.socket.on('getAllItems', (data: any) => {
      console.log('all items from socket');
      console.log(data);
      console.log(Object.keys(data).length);
      this.Message=this.Message.concat('2 \n Item List: \n')
      for(let i = 0; i < data.length ; i++){
        
        this.Message=this.Message.concat(`${i}. `+'title: '+ data[i].title+ ", price: "+ data[i].price +"\n")
      }
      console.log(this.Message);
      this.Message=this.Message.concat('\n \n')

      this.tempMessage+=this.Message;
      this.MessageHistory.next(this.tempMessage);
      this.Message='';
    })

    //entering placing order mode
    this.socket.on('BotMessage',(data: any) => {
      this.Message+=data + "\n";
      this.tempMessage+=this.Message;
      this.MessageHistory.next(this.tempMessage);
      this.Message='';
      this.placingOrder.next(true);
    })
    //exiting placing order mode
    this.socket.on('exitMessage',(data: any) => {
      this.Message+=data + "\n";
      this.tempMessage+=this.Message;
      this.MessageHistory.next(this.tempMessage);
      this.Message='';
      this.placingOrder.next(false);
    })

        this.socket.on('getChatHistory',(data: any)=>{
      console.log(data);
      if(data.length > 0){
      this.Message=this.Message.concat('4 \n Chat History: \n')
      for(let i=0;i<data.length;i++){
        this.Message=this.Message.concat(data[i].history)
      }
     }
     else this.tempMessage+="4 \n no history to show";
      this.tempMessage+=this.Message;
      this.MessageHistory.next(this.tempMessage);
      this.Message='';
    })

   

  }
  
  disconnect() {
    if (this.socket) {
      this.MessageHistory.next("");
      if(this.tempMessage!="")this.socket.emit('saveHistory', this.tempMessage);
      this.tempMessage="";
        this.socket.disconnect();
    }
}
}
