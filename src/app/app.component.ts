import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessService } from './process.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Process Match';
  
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: ProcessService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;  {2}
  }

  logout(){
    localStorage.removeItem('currentUser');
    
    this.auth.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
