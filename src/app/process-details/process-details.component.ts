import { Component, OnInit } from '@angular/core';
import { Process } from '../process';
import { ProcessService } from '../process.service';
import { ProcessListComponent } from '../process-list/process-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.css']
})
export class ProcessDetailsComponent implements OnInit {

  id: number;
  process: Process;

  constructor(private route: ActivatedRoute,private router: Router,
    private processService: ProcessService) { }

  ngOnInit() {
    this.process = new Process();

    this.id = this.route.snapshot.params['id'];
    
    this.processService.getProcess(this.id)
      .subscribe(data => {
        console.log(data)
        this.process = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['processes']);
  }

}
