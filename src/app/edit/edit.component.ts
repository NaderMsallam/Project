import { Component, OnInit } from '@angular/core';
import {
  AnyForUntypedForms,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TempUserService } from '../temp-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  fileData: any;
  previewUrl: any;
  form: any;
  registered: boolean = true;
  user: any;
  changedPhoto: boolean = false;

  constructor(
    private UserService: UserService,
    private router: Router,
    private tempUser: TempUserService
  ) {}

  ngOnInit(): void {
    this.changedPhoto = false;
    if (this.tempUser.AccessedByAdmin) {
      this.user = this.tempUser.user;
    } else {
      this.user = this.UserService.user;
    }

    console.log(this.user);

    this.form = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      
      phone: new FormControl(this.user.phone, Validators.required),
      photo: new FormControl(this.user.photo, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      id: new FormControl(this.user.id, Validators.required),

      address: new FormGroup({
        street: new FormControl(this.user.address.street, Validators.required),
        state: new FormControl(this.user.address.state, Validators.required),
        zip: new FormControl(this.user.address.zip, Validators.required),
      }),
    },{updateOn: 'submit'});
  }

  get name(){
    return this.form.get('name');
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }
  get confirmPassword(){
    return this.form.get('confirmPassword');
  }
  get phone(){
    return this.form.get('phone');
  }
  get lastName(){
    return this.form.get('lastName');
  }
  get id(){
    return this.form.get('id');
  }
  get street(){
    return this.form.get('address').get('street');
  }
  get state(){
    return this.form.get('address').get('state');
  }
  get zip(){
    return this.form.get('address').get('zip');
  }

  editUser(formValue: any) {
    if(this.form.valid){
    console.log('hoon');
    if (this.changedPhoto) {
      formValue.photo = this.previewUrl;
    } else {
      formValue.photo = this.user.photo;
    }

    console.log(formValue);
    this.UserService.editUser(formValue, (err: any, res: any) => {
      if (res == 'err') {
        alert('nonono');
       
      } else {
        console.log(res);
        if (this.tempUser.AccessedByAdmin) {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/profile']);
        }
      }
    });
  }
  }

  fileProgress(file: any) {
    this.changedPhoto = true;
    this.fileData = <File>file.target.files[0];
    if (this.fileData) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        console.log(reader.result);
      };
    }
  }
  
}
