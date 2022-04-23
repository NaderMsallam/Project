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
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.form= new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })
    
  }


  changePassword(formValue:any){
    formValue.email=this.user.email;
    this.userService.changePassword(formValue,(res:any,err:any)=>{
      if(res=='wrong password'){
        console.log("wrong password");
        
      }
      else{
        console.log("new pass:");
        
        console.log(res);
        
        this.router.navigate(['/profile']);
      }
    })
  }
}
