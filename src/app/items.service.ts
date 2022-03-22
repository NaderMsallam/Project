import { Injectable } from '@angular/core';

import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  Items:any;
  constructor(private api: ServerApiService) { }

  deleteItem(item:any, callback:any){
    this.api.deleteItem(JSON.stringify(item)).subscribe((res:any)=>{
      callback(null, res);
    },(err:any)=>{
      callback(err,null);
    }) 
  }

  addItem(item:any, callback:any){
    this.api.addItem(JSON.stringify(item)).subscribe((res:any)=>{
      console.log(res);
      
      callback(null,res);
    },(err:any)=>{
      callback(err,null);
    });
  }

  editItem(item:any,callback:any){  
    ( this.api.editItem(item)).subscribe((res)=>{
     console.log(res);
     callback(null,res);  
         
   },(error)=>{
     console.log(error);
     callback(error,null)
     
   })
 }

}
