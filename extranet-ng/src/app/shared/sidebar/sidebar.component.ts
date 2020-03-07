import { Component, OnInit,Input } from "@angular/core";
import {AuthService} from '../../auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  private subject = new Subject<any>();
  constructor(private authService:AuthService){}
  ngOnInit() {}

  sendFactory(){
   
  }
  sendPartner(){
  }
  sendCustomerCare(){
    
  }

  logout(){
   
  }
}
