import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any;
  registered:boolean = true;
  fileData:any;
  previewUrl:any;
  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.UserService.registered.subscribe((registered:any)=>{
      this.registered=registered;
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });
  }

  register(formValue: any) {
    console.log("hoon");
    formValue.photo=this.previewUrl;
    console.log(formValue);
    this.UserService.register(formValue, (err: any, res: any) => {
      if (res=='err') {
        alert("nonono");
        this.registered=false;
      } else {
        console.log(res);
       
        this.router.navigate(["/login"]);
      }
    });
  }

  fileProgress(file:any){
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
