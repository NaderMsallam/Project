import { Injectable } from '@angular/core';
import { Item } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  shopCart:Item[]=[];

  constructor() { }
  
  addToCart(title: string,description: string,price: number){
    
    this.shopCart.push({title,description,price})
  }
  emptyCart(){
    this.shopCart=[];
  }
}
