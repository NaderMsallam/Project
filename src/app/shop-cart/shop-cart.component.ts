import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import{ShopCartService} from '../shop-cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  products:any;
  constructor(private ShopCartService: ShopCartService, private user: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.products=this.ShopCartService.shopCart;
  }

  addOrder(){
    const email=this.user.user.email;
    const order={email:email,order: this.products};
    this.orderService.addOrder(order, (err: any, res: any)=>{
      if(err){
        console.log(err);
        
      }else{
        console.log(res);
        this.ShopCartService.emptyCart();
        this.products=[];
      }
    })
  }
  
}
