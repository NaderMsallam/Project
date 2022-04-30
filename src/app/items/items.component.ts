import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { ServerApiService } from '../server-api.service';
import { TempItemService } from '../temp-item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  itemForm !: FormGroup;
  subscription !: Subscription;

  constructor(
    private itemsService: ItemsService,
    private api: ServerApiService,
    private router: Router,
    private tempItem: TempItemService
  ) {}
  items: any;
  ngOnInit(): void {
    //this.itemsService.getAllItems();

    this.getAllItems();

    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addItem(formValue: any) {
    this.itemsService.addItem(formValue, (err: any, res: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);

        this.getAllItems();
      }
    });
  }

  editItem(formValue: any) {
    this.tempItem.setItem(formValue);
    this.router.navigate(['/editItem']);
  }

  deleteItem(data: any) {
    this.itemsService.deleteItem(data, (err: any, res: any) => {
      if (err) {
        console.log(err);
      } else {
        this.getAllItems();
      }
    });
  }
  getAllItems() {
    this.subscription = this.api.getAllItems().subscribe(
      (res: any) => {
        this.items = res;

        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
