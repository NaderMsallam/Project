import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private api: ServerApiService) { }

  addOrder(order: any, callback: any) {
    console.log("addOrder Service entered");
    
    this.api.addOrder(JSON.stringify(order)).subscribe(
      (res: any) => {
        console.log(res);

        callback(null, res);
      },
      (err: any) => {
        callback(err, null);
      }
    );
  }
}
