import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  jacinth:string='jacinth';
  isHidden = false;
  isloggedIn$:Observable<boolean>;
  constructor(private router:Router,private authService :AuthService){

  }
  ngOnInit() {
    this.isloggedIn$ = this.authService.isloggedIn;
    console.log('logged in value ',this.isloggedIn$._isScalar);
    
  
  }
 
}
