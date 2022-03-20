import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../items.service'
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }
  items:any;
  ngOnInit(): void {
    this.itemsService.getAllItems();
  }

  getAllItems(){
  
    this.items=this.itemsService.Items;
    console.log(this.items);
    
  }

}
