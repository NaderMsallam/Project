import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempItemService {
  item:any;
  constructor() { }
  setItem(item:any){
    this.item=item;
  }
}
