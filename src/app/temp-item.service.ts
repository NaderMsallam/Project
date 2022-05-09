import { Injectable } from '@angular/core';
import { Item } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class TempItemService {
  item !:Item;
  constructor() { }
  setItem(item:Item){
    this.item=item;
  }
}
