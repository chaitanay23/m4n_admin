import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {MainService} from '../../../shared/services/main.service';
import {ActivatedRoute,Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  mobileNumber:number;
  password:string;

  
  constructor(private service :MainService,private route:Router,private authService :AuthService) {}

  login() {

    this.authService.signIn(this.mobileNumber,this.password).subscribe(res=>{
      
      if(res.status == 'true'){
        this.authService.loggedIn.next(true);
        console.log('login comp value of auth ', this.authService.loggedIn.value);
        localStorage.setItem('isloggedIn','true');
        this.route.navigate(['/dashboard']);
      }
      
    })
    
    // this.service.adminlogin(this.mobileNumber,this.password).subscribe(res=>{
    //   if(res.status == 'true'){
    //     this.route.navigate(['dashboard']);
    //   }else{
    //     alert('Invalid Credentials')
    //   }
    // })
  }
  ngOnInit() {
    
  }
}
