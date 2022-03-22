import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerApiService } from '../server-api.service';
import { TempUserService } from '../temp-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any;
  subscription: any;
  constructor(
    private api: ServerApiService,
    private tempUser: TempUserService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers() {
    this.subscription = this.api.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;

        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  editUser(data: any) {
    this.tempUser.setUser(data);

    this.router.navigate(['/edit']);
  }
  deleteUser(data: any) {
    this.userService.deleteUser(data, (err: any, res: any) => {
      if (err) {
        console.log(err);
      } else {
        this.getAllUsers();
      }
    });
  }
}
