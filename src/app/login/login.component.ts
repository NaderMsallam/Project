import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any;
  unauthorized:boolean=false;
  constructor(
    private UserService: UserService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      password:new FormControl("", Validators.required),
      email:new FormControl("", [Validators.required,Validators.email])
    });
  }

  login(formValue:any) {
    console.log(formValue);
    this.UserService.login(formValue,(err:any,res:any)=>{
      if(err){
        console.log(err);
        this.unauthorized=true;
      } else{
        console.log(res);
        console.log("success");
        
        this.router.navigate(["/profile"])       
      }
    })    
  }

}
