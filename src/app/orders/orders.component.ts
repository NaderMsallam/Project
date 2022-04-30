import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerApiService } from '../server-api.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{
  email !: string;
  isAdmin: boolean = false;
  subscription !: Subscription;
  orders:any;
  sum:number=0;
  overall:Array<number>=[];
  products:any;
  constructor(private userService: UserService, private api: ServerApiService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.email=this.userService.user.email;
    if (this.userService.user.role == 'Admin') this.isAdmin = true;
    this.getAllOrders();
  }
  getAllOrders(){

    if(this.isAdmin){
      this.subscription=this.api.AdminGetAllOrders().subscribe((res:any)=>{
        console.log(res);
        console.log('theOrders'+ res);
        this.orders=res;
        for(let i = 0; i < this.orders.length; i++){
          this.sum=0;
          for(let j = 0; j < this.orders[i].order.length; j++){
            this.sum+=this.orders[i].order[j].price;
          }
          this.overall.push(this.sum);
        }
        console.log("overall");
        console.log(this.overall);
      },(err:any)=>{
        console.log(err);
        
      })
    }
    else{
      this.subscription = this.api.getAllOrders(this.email).subscribe(
        (res: any) => {
          console.log('theOrders'+ res);
          
          this.orders = res;
          for(let i = 0; i < this.orders.length; i++){
            this.sum=0;
            for(let j = 0; j < this.orders[i].order.length; j++){
              this.sum+=this.orders[i].order[j].price;
            }
            this.overall.push(this.sum);
          }
          console.log("overall");
          console.log(this.overall);
          
          
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
