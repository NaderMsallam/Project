import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  user: string='';
  tempMessage:string='';
  placingOrderSubscription !: Subscription;
  placingOrder:boolean=false;
  MessageHistory:string = '';
  form !: FormGroup;
  subscription !: Subscription;
  constructor(
    private socketService: SocketioService,
    private isloggedIn: IsLoggedInService,
    private userService: UserService,
    private _snackBar: MatSnackBar
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
  this.placingOrderSubscription.unsubscribe();
}

  get f() { return this.form.controls; }

  onKeyDownEvent(e:any,formValue:any){
    e.preventDefault();
    this.sendMessege(formValue);
    this.f['Message'].reset();
   
  }
  sendMessege(formValue:any){
    //placing order mode
    if(this.placingOrder){
      this.socketService.socket.emit('buyProduct', this.f['Message'].value);
      this.socketService.placingOrder.next(false);
    }
    //normal menu mode
    else{
    this.socketService.socket.emit('hello', this.f['Message'].value);
  }
    

    
    this.f['Message'].reset();
      console.log(formValue.Message);
      
   

    
  }
  saveHistory(e:any){
    e.preventDefault();
    this._snackBar.open("chat history saved","cancel")
    this.socketService.saveHistory();
  }
  
}
