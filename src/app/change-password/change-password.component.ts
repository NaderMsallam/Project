import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form:any;
  user:any;
  wrongPassword:boolean=false;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.form= new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    },{updateOn: "submit"})
    
  }

  get oldPassword(){
    return this.form.get('oldPassword');
  }
  get newPassword(){
    return this.form.get('newPassword');
  }

  changePassword(formValue:any){
    if(this.form.valid){
    formValue.email=this.user.email;
    this.userService.changePassword(formValue,(err:any,res:any)=>{
      //service might return null in case of wrong password input
      if(err || res===null){
        console.log("wrong password");
        this.wrongPassword=true;
      }
      else{
        this.wrongPassword=false;
        console.log("new pass:");
        
        console.log(res);
        
        this.router.navigate(['/profile']);
      }
    })
  }
  }
}
