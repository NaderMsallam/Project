import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IsLoggedInService } from '../is-logged-in.service';
import { ServerApiService } from '../server-api.service';
import {ShopCartService} from'../shop-cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Item } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products !: Item[];
  subscription !: Subscription;
  loggedIn: boolean = false;
  constructor(private api: ServerApiService,private ShopCartService: ShopCartService,private isloggedIn: IsLoggedInService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllItems();
    this.loggedIn=this.isloggedIn.getLoggedIn();
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getAllItems() {
    this.subscription = this.api.getAllItems().subscribe(
      (res: any) => {
        this.products = res;

        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  addToCart(product:any){
    this._snackBar.open("added item to shop cart","cancel")
    this.ShopCartService.addToCart(product.title,product.description,product.price);
  }

}
