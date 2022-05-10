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
      
    return this.http.post('http://localhost:3051/login', user, this.httpOptions);
  }

  logout(){
    return this.http.get('http://localhost:3051/logout', this.httpOptions);
  }
  register(user: String) {
    
    return this.http.post('http://localhost:3051/register', user, this.httpOptions);
  }

  editUser(user: String) {
    
    return this.http.post('http://localhost:3051/edit', user, this.httpOptions);
  }

  changePassword(user: String) {
    
    return this.http.post('http://localhost:3051/changePassword', user, this.httpOptions);
  }

  getUserByToken() {
    return this.http.get('http://localhost:3051/getUserByToken', this.httpOptions);
  }

  getAllUsers(){
    return this.http.get('http://localhost:3051/getAllUsers', this.httpOptions);
  }

  deleteUser(user:String) {
    return this.http.post('http://localhost:3051/deleteUser',user, this.httpOptions);
  }

  getAllItems(){
    return this.http.get('http://localhost:3051/getAllItems', this.httpOptions);
  }

  addItem(item:String) {
    return this.http.post('http://localhost:3051/addItem',item, this.httpOptions);
  }
  
  deleteItem(item:String) {
    return this.http.post('http://localhost:3051/deleteItem',item, this.httpOptions);
  }

  editItem(item:String) {
    return this.http.post('http://localhost:3051/editItem',item, this.httpOptions);
  }

  addOrder(order:String) {
    return this.http.post('http://localhost:3051/addOrder',order, this.httpOptions);
  }
  getAllOrders(email:String) {
    return this.http.get(`http://localhost:3051/getAllOrders?email=${email}`, this.httpOptions);
  }
  AdminGetAllOrders() {
    return this.http.get(`http://localhost:3051/AdminGetAllOrders`, this.httpOptions);
  }
 
}
