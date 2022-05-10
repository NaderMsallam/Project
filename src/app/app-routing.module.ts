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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ContactComponent } from './contact/contact.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'gallery', component: GalleryComponent },

  { path: 'orders', component: OrdersComponent, canActivate:[AuthGuard] },
  { path: 'shop-cart', component: ShopCartComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] }, 
  { path: 'edit', component: EditComponent, canActivate:[AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate:[AuthGuard] },
  { path: 'editItem', component: EditItemComponent, canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: 'password', component:ChangePasswordComponent, canActivate:[AuthGuard] },
  {path: 'Admin', component: AdminSignUpComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
