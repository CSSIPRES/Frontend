import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SendMailService } from '../services/send-mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
sendMailForm=new FormGroup({
  email:new FormControl('', Validators.required)
});
  constructor(private sendMailService:SendMailService,private router:Router) { }

  ngOnInit() {
  }
  sendMail(){
    this.sendMailService.sendMail(this.sendMailForm.value).subscribe(
      resp=>{
        console.log(resp);
        if(resp==null){
          this.router.navigate(['/motPasseOublie'])
        }
      }
    )
  }
}
