import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  checked:boolean =false;
  unauthorized: boolean = false;
  constructor(private UserService: UserService, private router: Router, private socketService: SocketioService) {}

  ngOnInit(): void {
    if(localStorage.getItem('email')!==null){
      this.checked=true;
      const savedEmail=localStorage.getItem('email');
      const savedPassword=localStorage.getItem('pass');
      this.form = new FormGroup({
        password: new FormControl(savedPassword, Validators.required),
        email: new FormControl(savedEmail, [Validators.required, Validators.email]),
      },{updateOn: "submit"});
    }
    else{
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    },{updateOn: "submit"});
  }
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  onSelectionChanged(arg: MatCheckboxChange) {
    this.checked = arg.checked;
  }

  login(formValue: any) {
    if(this.form.valid){
    console.log(formValue);
    this.UserService.login(formValue, (err: any, res: any) => {
      if (err) {
        console.log(err);
        this.unauthorized = true;
      } else {
        console.log(res);
        console.log('success');
        if(this.checked==true) {
        localStorage.setItem('email', this.form.value.email);
        localStorage.setItem('pass', this.form.value.password);
      }
      else{
        localStorage.removeItem('email');
        localStorage.removeItem('pass');
      }
        console.log(localStorage.getItem('email'));
        
        this.socketService.setupSocketConnection();
        this.router.navigate(['/home']);
      }
    });
  }
}
}
