import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CoreService } from '../services/core.service';
import { environment } from 'src/environments/environments';




@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private coreService: CoreService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = null;
    if(request.url.includes("messe-api.eglise-mukasa.ci"))
      token = environment.massToken; //Token for mass api
    

    if(token !== null){
      //Clone the request to modify by insert token
      let clone =request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      //return the request modified 
      return next.handle(clone).pipe(
        catchError((error) => { 
          
          if(error.status === 401){
            this.coreService.goToPageError();//redirect to login if session expired
            return throwError('Session expirée: '+ error);
          }
          else if (error.status === 404){
            this.coreService.goToPageNotFound();
            return throwError('La page est introuvable: '+ error.status);
          }
          
          this.coreService.goToPageError();//else redirect to page error
          return throwError('Une erreur est survenue lors de l\'interception de la requête: '+ error.status);
        }),
      );
    }
    
    return next.handle(request);
  }

  
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
}
