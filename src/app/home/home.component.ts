import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../app.component';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  subscription !: Subscription;
  products!: Item[];
  constructor(private api: ServerApiService) { }

  ngOnInit(): void {
    this.getAllItems();
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

}
