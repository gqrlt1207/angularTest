import { Component, OnInit } from '@angular/core';
import { ProcessDetailsComponent } from '../process-details/process-details.component';
import { Observable } from "rxjs";
import { ProcessService } from "../process.service";
import { Process } from "../process";
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})


export class ProcessListComponent implements OnInit {

  processes: Observable<Process[]>;

  constructor(private processService: ProcessService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.processes = this.processService.getProcessesList();
  }

  deleteProcess(id: number) {
    this.processService.deleteProcess(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  processDetails(id: number){
    this.router.navigate(['details', id]);
  }

}
