import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TempUserService } from '../temp-user.service';
import {UserService} from '../user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fileData:any;
  previewUrl:any;
  form: any;
  registered:boolean = true;
  user:any;
  changedPhoto:boolean=false;

  constructor(private UserService: UserService, private router:Router, private tempUser: TempUserService) { }

  ngOnInit(): void {
    this.changedPhoto=false
    if(this.tempUser.AccessedByAdmin){
      this.user=this.tempUser.user;
    }else{
       this.user=this.UserService.user;
    }
   
    console.log(this.user);
    
  this.form = new FormGroup({
    name: new FormControl(this.user.name, Validators.required),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    password: new FormControl(this.user.password, Validators.required),
    phone: new FormControl(this.user.phone, Validators.required),
    photo: new FormControl(this.user.photo, Validators.required),
  });
  }


  editUser(formValue: any) {
    console.log("hoon");
    if(this.changedPhoto){
      formValue.photo=this.previewUrl;
    } else {
      formValue.photo=this.user.photo;
    }
    
    console.log(formValue);
    this.UserService.editUser(formValue, (err: any, res: any) => {
      if (res=='err') {
        alert("nonono");
        this.registered=false;
      } else {
        console.log(res);
        if(this.tempUser.AccessedByAdmin){
          this.router.navigate(["/users"])
        }else{
          this.router.navigate(["/profile"]);
        }
        
      }
    });
  }

  

  fileProgress(file:any){
    this.changedPhoto=true;
    this.fileData=<File> file.target.files[0];
    if(this.fileData){
      const reader=new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload=(_event)=>{
        this.previewUrl=reader.result;
        console.log(reader.result);
        
      }
    }
  }

}
