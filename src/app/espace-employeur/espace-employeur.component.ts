import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeExistService } from '../services/employe-exist.service';
@Component({
  selector: 'app-espace-employeur',
  templateUrl: './espace-employeur.component.html',
  styleUrls: ['./espace-employeur.component.css']
})
export class EspaceEmployeurComponent implements OnInit {
id:number;
isExpanded:boolean=false;
empInfo:any=[];
  constructor(private route : ActivatedRoute,
    private empService:EmployeExistService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getEmployer(this.id);

  }
  getEmployer(id){
        this.empService.getEmployer(id).subscribe(resp=>{
          this.empInfo=resp;
          console.log(this.empInfo);
    })
  }
}