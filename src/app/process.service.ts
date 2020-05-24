import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './login/user';
import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({ 
          "Access-Control-Allow-Origin" : "http://wintest:4200",
         "Access-Control-Allow-Methods" : "POST,UPDATE,GET,OPTIONS,DELETE",
          "Content-Type" : "application/json"  
  })
  
};


@Injectable({
  providedIn: 'root'
})



export class ProcessService {
  
  private baseUrl = 'http://localhost:8080/api/v1/process/';
  private baseUrl2 = 'http://localhost:8080/api/v1/userinfo/';

  user: User = new User();

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public loggedIn = new BehaviorSubject<boolean>(false); // {1}

  public get isLoggedIn() {
    console.log(this.loggedIn.value);
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient, private router: Router) { } 
  

  getProcess(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  addProcess(process: Object): Observable<Object> {    
    return this.http.post(`${this.baseUrl}`, process, httpOptions);
  }

  updateProcess(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`, value);
  }

  deleteProcess(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}` ,httpOptions);
  }

  getProcessesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
}


  getUserInfo(username: string, password: string){
     console.log(`${this.baseUrl2}username=${username}`);
     this.loggedIn.next(false);
     this.http.get(`${this.baseUrl2}username=${username}`,httpOptions).subscribe(
      data => {
        console.log(data);
        this.user.id=data['id'];
        this.user.password=data['password'];
        this.user.username=data['username'];
        this.user.admin=data['admin'];
        this.user.job=data['job'];
        this.user.firstname=data['firstname'];
        this.user.lastname=data['lastname'];     

      
        console.log(this.user.password);
        
        if(this.user.password==`${password}` && this.user.username==`${username}`){
          
          console.log("password is correct.");
          
         localStorage.setItem('currentUser', JSON.stringify(this.user));
         console.log(this.user);
         this.loggedIn.next(true);

         
         //this.currentUserSubject.next(this.user);
         
         this.router.navigate(['/processes']);   
          return data;
        }
        else{
          console.log("user name password is wrong!");
          this.user.password=null;
          this.user.username=null;
          
          this.logout();
          
          return data;
        }  
        
      });
         
    
  }

  

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
}


  
}