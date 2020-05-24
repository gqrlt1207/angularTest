import { ProcessService } from './process.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot } from '@angular/router';


@Injectable(
  {
    providedIn: 'root'

  }
)
export class LoginGuard implements CanActivate {
    constructor(public auth: ProcessService, protected router: Router) { }
    /*
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          console.log(isLoggedIn);
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
          
          return true;
        })
      );
    }
    */
   
     
   
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
     return new Observable<boolean>((observer)=>{setTimeout(()=>{
      console.log(this.auth.isLoggedIn['source']['value']);
        const currentUser = this.auth.isLoggedIn['source']['value'];
        observer.next(currentUser);
        observer.complete();   

      },1000);});
     }

}
  
        
    
  

