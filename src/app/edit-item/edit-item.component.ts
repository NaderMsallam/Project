import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../app.component';
import { ItemsService } from '../items.service';
import { TempItemService } from '../temp-item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  itemForm !: FormGroup;
  item!: Item;
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
    },{updateOn: 'submit'});
  }

  get title(){
    return this.itemForm.get('title');
  }
  get price(){
    return this.itemForm.get('price');
  }
  get description(){
    return this.itemForm.get('description');
  }

  editItem(formValue: any) {
    if(this.itemForm.valid){
    
    console.log(formValue);
    
    console.log(formValue);
    this.itemService.editItem(formValue, (err: any, res: any) => {
      if (res == 'err') {
        alert('error input');
      } else {
        console.log(res);

        this.router.navigate(['/items']);
      }
    });
  }}
}
