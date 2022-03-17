import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerApiService {
  constructor(private http: HttpClient) {}

  login(user: String) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
    };
   
    return this.http.post('http://localhost:3000/login', user, httpOptions);
  }

  register(user: String) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
    };
    return this.http.post('http://localhost:3000/register', user, httpOptions);
  }

  editUser(user: String) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
    };
    return this.http.post('http://localhost:3000/edit', user, httpOptions);
  }
}
