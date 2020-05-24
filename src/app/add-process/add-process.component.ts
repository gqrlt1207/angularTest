import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';
import { Process } from '../process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.css']
})
export class AddProcessComponent implements OnInit {

  process: Process = new Process();
  submitted = false;

  constructor(private processService: ProcessService,
    private router: Router) { }

  ngOnInit() {
  }

  newProcess(): void {
    this.submitted = false;
    this.process = new Process();
  }

  save() {
    this.processService.addProcess(this.process)
      .subscribe(data => console.log(data), error => console.log(error));
    this.process = new Process();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/processes']);
  }

}
