import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import {ItemsComponent } from './items/items.component'
import { AuthGuard } from './auth.guard';
import { EditItemComponent } from './edit-item/edit-item.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] }, 
  { path: 'edit', component: EditComponent, canActivate:[AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate:[AuthGuard] },
  { path: 'editItem', component: EditItemComponent, canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
