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
      
    return this.http.post('http://localhost:3000/login', user, this.httpOptions);
  }

  logout(){
    return this.http.get('http://localhost:3000/logout', this.httpOptions);
  }
  register(user: String) {
    
    return this.http.post('http://localhost:3000/register', user, this.httpOptions);
  }

  editUser(user: String) {
    
    return this.http.post('http://localhost:3000/edit', user, this.httpOptions);
  }

  changePassword(user: String) {
    
    return this.http.post('http://localhost:3000/changePassword', user, this.httpOptions);
  }

  getUserByToken() {
    return this.http.get('http://localhost:3000/getUserByToken', this.httpOptions);
  }

  getAllUsers(){
    return this.http.get('http://localhost:3000/getAllUsers', this.httpOptions);
  }

  deleteUser(user:String) {
    return this.http.post('http://localhost:3000/deleteUser',user, this.httpOptions);
  }

  getAllItems(){
    return this.http.get('http://localhost:3000/getAllItems', this.httpOptions);
  }

  addItem(item:String) {
    return this.http.post('http://localhost:3000/addItem',item, this.httpOptions);
  }
  
  deleteItem(item:String) {
    return this.http.post('http://localhost:3000/deleteItem',item, this.httpOptions);
  }

  editItem(item:String) {
    return this.http.post('http://localhost:3000/editItem',item, this.httpOptions);
  }

  addOrder(order:String) {
    return this.http.post('http://localhost:3000/addOrder',order, this.httpOptions);
  }
  getAllOrders(email:String) {
    return this.http.get(`http://localhost:3000/getAllOrders?email=${email}`, this.httpOptions);
  }
  AdminGetAllOrders() {
    return this.http.get(`http://localhost:3000/AdminGetAllOrders`, this.httpOptions);
  }
 
}
