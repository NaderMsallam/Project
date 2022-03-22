import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { TempItemService } from '../temp-item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  itemForm: any;
  item: any;
  constructor(
    private tempItem: TempItemService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.item = this.tempItem.item;

    this.itemForm = new FormGroup({
      title: new FormControl(this.item.title, Validators.required),
      price: new FormControl(this.item.price, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
    });
  }

  editItem(formValue: any) {
    console.log('da da');

    console.log(formValue);
    formValue._id = this.item._id;
    console.log(formValue);
    this.itemService.editItem(formValue, (err: any, res: any) => {
      if (res == 'err') {
        alert('nonono');
      } else {
        console.log(res);

        this.router.navigate(['/items']);
      }
    });
  }
}
