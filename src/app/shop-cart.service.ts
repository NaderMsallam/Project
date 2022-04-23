import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  shopCart:any[]=[];

  constructor() { }
  
  addToCart(title: string,description: string,price: number){
    
    this.shopCart.push({title,description,price})
  }
  emptyCart(){
    this.shopCart=[];
  }
}
