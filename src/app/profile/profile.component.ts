import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log('look here');
    console.log(this.user);

    /* this.userService.user.subscribe((user:any)=>{
      this.user=user;
      console.log(user);
      
    }); */
  }

  editUser() {
    this.router.navigate(['/edit']);
  }
}
