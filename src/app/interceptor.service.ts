
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from 
'@angular/common/http'
import {Observable, tap} from 'rxjs'
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log('Intercept request', req)

return next.handle(req)
.pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
         
        console.log(" all looks good");
        // http response status code
        console.log(event.status);
      }
    }, error => {
     // http response status code
        console.log("----response----");
        console.error("status code:");
        console.error(error.status);
        console.error(error.message);
        console.log("--- end of response---");
        if(error.error && error.error==="Invalided token") 
        {
          
          window.location.href = "/";
        }
    })
  )
}
}
