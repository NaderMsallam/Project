import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IsLoggedInService } from '../is-logged-in.service';
import { SocketioService } from '../socketio.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit,OnDestroy {
  loggedIn: boolean = false;
  user: any;
  tempMessage='';
  placingOrderSubscription:any;
  placingOrder:boolean=false;
  MessageHistory = '';
  form:any;
  subscription: any;
  constructor(
    private socketService: SocketioService,
    private isloggedIn: IsLoggedInService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      Message: new FormControl('')
    });
    this.isloggedIn.loginEvent.subscribe((login: any) => {
      this.loggedIn = login;
      this.user = this.userService.user.name;
      

      
    });
    this.subscription=this.socketService.MessageHistory.subscribe((message: any) => {
      this.tempMessage=message;
    })
    this.placingOrderSubscription=this.socketService.placingOrder.subscribe((placingOrder: any) => {
      this.placingOrder=placingOrder;
    })
    
}
ngOnDestroy(){
  this.tempMessage="";
  this.subscription.unsubscribe();
}

  get f() { return this.form.controls; }

  onKeyDownEvent(e:any,formValue:any){
    e.preventDefault();
    this.f.Message.reset();
    this.sendMessege(formValue);
  }
  sendMessege(formValue:any){
    //placing order mode
    if(this.placingOrder){
      this.socketService.socket.emit('buyProduct', this.f.Message.value);
      this.socketService.placingOrder.next(false);
    }
    //normal menu mode
    else{
    this.socketService.socket.emit('hello', this.f.Message.value);
  }
    

    
    this.f.Message.reset();
      console.log(formValue.Message);
      
   

    
  }
  
}
