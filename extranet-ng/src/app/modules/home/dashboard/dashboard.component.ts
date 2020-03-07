import { Component, OnInit } from "@angular/core";
import { MainService } from "../../../shared/services/main.service";
import {AuthService} from '../../../auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  jacinth:string='jacinth';
  userCount: Number;
  orderCount: Number;
  revenue: Number;
  isClicked =false;
  isClicked2 = false;
  currentOrders :number;
  constructor(private services: MainService,private authService: AuthService) {

    this.services.userCount().subscribe(res => {
      this.userCount = res.count;
    })
    this.services.orderCount().subscribe(res => {
      this.orderCount = res.count;
    })
    this.services.revenueEarned().subscribe(res => {
      this.revenue = res.total;
    })
    this.services.getCurrentOrder().subscribe(res=>{
      console.log(res);
      this.currentOrders = res.data[0].Count;
    })
    
  }

  barChartLabels = [];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 6
  };

  pieChartType = 'pie';
  barChartType = 'line';
  doughChartType = 'doughnut';
  barChartLegend = true;

  barChartData = [

    {
      fillColor: "rgba(151,249,190,0.5)",
      strokeColor: "rgba(255,255,255,1)",
      data: [], label: 'Orders',
      // backgroundColor:['#388ec4','#388ec4','#388ec4','#388ec4','#388ec4','#388ec4','#388ec4','#388ec4','#388ec4'],

    },

  ];

  refreshInfo(){
    this.services.getCurrentOrder().subscribe(res=>{
      console.log(res);
      this.currentOrders = res.data[0].Count;
    })
  }

  uploadGPH(event) {
    if(event.target.value == '2019'){
      this.isClicked = true;
      this.isClicked2 = false;
    }else{
      this.isClicked2 = true;
      this.isClicked = false;
    }
    this.services.graphDetails(event.target.value).subscribe(res => {
      this.barChartLabels = res.data.map(data => { return data.name });
      this.barChartData[0].data = res.data.map(data => { return data.total })
      console.log(this.barChartData);
      console.log(this.barChartLabels);

    })
  }
  ngOnInit() { 
    this.authService.isloggedIn.subscribe(res=>
      console.log('value of auth',res));
  }
}
