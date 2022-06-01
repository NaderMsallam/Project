import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),withCredentials: true 
  };

  constructor(private http: HttpClient) {}

  
  login(user: String) {
      
    return this.http.post('https://rt-dev.xyz:3072/login', user, this.httpOptions);
  }

  logout(){
    return this.http.get('https://rt-dev.xyz:3072/logout', this.httpOptions);
  }
  register(user: String) {
    
    return this.http.post('https://rt-dev.xyz:3072/register', user, this.httpOptions);
  }

  editUser(user: String) {
    
    return this.http.post('https://rt-dev.xyz:3072/edit', user, this.httpOptions);
  }

  changePassword(user: String) {
    
    return this.http.post('https://rt-dev.xyz:3072/changePassword', user, this.httpOptions);
  }

  getUserByToken() {
    return this.http.get('https://rt-dev.xyz:3072/getUserByToken', this.httpOptions);
  }

  getAllUsers(){
    return this.http.get('https://rt-dev.xyz:3072/getAllUsers', this.httpOptions);
  }

  deleteUser(user:String) {
    return this.http.post('https://rt-dev.xyz:3072/deleteUser',user, this.httpOptions);
  }

  getAllItems(){
    return this.http.get('https://rt-dev.xyz:3072/getAllItems', this.httpOptions);
  }

  addItem(item:String) {
    return this.http.post('https://rt-dev.xyz:3072/addItem',item, this.httpOptions);
  }
  
  deleteItem(item:String) {
    return this.http.post('https://rt-dev.xyz:3072/deleteItem',item, this.httpOptions);
  }

  editItem(item:String) {
    return this.http.post('https://rt-dev.xyz:3072/editItem',item, this.httpOptions);
  }

  addOrder(order:String) {
    return this.http.post('https://rt-dev.xyz:3072/addOrder',order, this.httpOptions);
  }
  getAllOrders(email:String) {
    return this.http.get(`https://rt-dev.xyz:3072/getAllOrders?email=${email}`, this.httpOptions);
  }
  AdminGetAllOrders() {
    return this.http.get(`https://rt-dev.xyz:3072/AdminGetAllOrders`, this.httpOptions);
  }
 
}
