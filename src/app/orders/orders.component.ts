import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../server-api.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  email: any;
  subscription:any;
  orders:any;
  products:any;
  constructor(private userService: UserService, private api: ServerApiService) { }

  ngOnInit(): void {
    this.email=this.userService.user.email;
    this.getAllOrders();
  }
  getAllOrders(){
    
      this.subscription = this.api.getAllOrders(this.email).subscribe(
        (res: any) => {
          this.orders = res;
          
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
   
  }
}
