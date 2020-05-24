import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';
import { User } from './user';
import { Router } from "@angular/router";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  submitted = false;
    
  user: User =new User();
  
  

  constructor(
    private processService: ProcessService,
    private router: Router,
    
    
  ) {

    
  }
   
    ngOnInit() {}
   
  
  
  onSubmit() {
      this.submitted = true;
      
      
      this.processService.getUserInfo(this.user.username,this.user.password);    
      this.gotoList();  
       
        
  }

  gotoList() {
    this.router.navigate(['/processes']);
  }

  gotoDefault() {
    this.router.navigate(['/login']);
  }
  
}
