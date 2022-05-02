import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { EditComponent } from './edit/edit.component';
import { ItemsComponent } from './items/items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component'; 
import { MatVideoModule } from 'mat-video';
import { FooterComponent } from './footer/footer.component';
import {MatCardModule} from '@angular/material/card'; 
import { SocketioService } from './socketio.service';
import {MatInputModule} from '@angular/material/input';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio'; 
import { AuthInterceptor } from './interceptor.service';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    EditComponent,
    ItemsComponent,
    EditItemComponent,
    UsersComponent,
    ChangePasswordComponent,
    GalleryComponent,
    AboutUsComponent,
    
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    ShopCartComponent,
    FooterComponent,
    ChatComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatVideoModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [SocketioService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
