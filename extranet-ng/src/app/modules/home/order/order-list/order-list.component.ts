import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: [ './order-list.component.css' ]
})
export class OrderListComponent implements OnInit {
	orderList: any;
	constructor(private service: MainService) {
		this.service.orderListGet().subscribe((res) => {
			if ((res.status = true)) {
				this.orderList = res.orders;
			} else {
				alert('Connection lost');
			}
		});
	}

	ngOnInit() {}
}
