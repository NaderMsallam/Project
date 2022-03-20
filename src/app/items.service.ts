import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  Items:any;
  constructor(private api: ServerApiService) { }

  getAllItems(){
    this.api.getAllItems().subscribe((res:any)=>{
      this.Items=res;
      console.log(res);
    },(err:any)=>{
      console.log(err);
      
    })
  }
}
