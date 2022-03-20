import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  
  login(user: String) {
      
    return this.http.post('http://localhost:3000/login', user, this.httpOptions);
  }

  register(user: String) {
    
    return this.http.post('http://localhost:3000/register', user, this.httpOptions);
  }

  editUser(user: String) {
    
    return this.http.post('http://localhost:3000/edit', user, this.httpOptions);
  }

  getAllItems(){
    return this.http.get('http://localhost:3000/getAllItems', this.httpOptions);
  }
}
