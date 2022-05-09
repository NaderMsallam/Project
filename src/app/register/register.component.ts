import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import {PassValidatorService} from '../pass-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form !: FormGroup;
  registered: boolean = true;
  fileData: any;
  previewUrl: any;
  constructor(private UserService: UserService, private router: Router,private PassValidatorService: PassValidatorService) {}

  ngOnInit(): void {
    this.UserService.registered.subscribe((registered: any) => {
      this.registered = registered;
    });
    
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      role: new FormControl('customer', Validators.required),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required),
      }),
    },{
      validators: [PassValidatorService.match('password', 'confirmPassword')]
    }
    ,{ updateOn: 'submit' } as unknown as AsyncValidatorFn);
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
    return this.form.get('address')!.get('street');
  }
  get state(){
    return this.form.get('address')!.get('state');
  }
  get zip(){
    return this.form.get('address')!.get('zip');
  }
  get photo(){
    return this.form.get('photo');
  }

  register(formValue: any) {
    if(this.form.valid){
    console.log('hoon');
    formValue.photo = this.previewUrl;
    console.log(formValue);
    this.UserService.register(formValue, (err: any, res: any) => {
      if (res == 'err') {
        alert('nonono');
        this.registered = false;
      } else {
        console.log(res);

        this.router.navigate(['/login']);
      }
    });
  }
  }

  fileProgress(file: any) {
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
