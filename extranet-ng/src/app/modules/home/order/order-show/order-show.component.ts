import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
@Component({
	selector: 'app-order-show',
	templateUrl: './order-show.component.html',
	styleUrls: [ './order-show.component.css' ]
})
export class OrderShowComponent implements OnInit {
	url = environment.url;
	id: number;
	orderDetail: any;
	cartDetailShow: boolean = false;
	constructor(private service: MainService, private active_route: ActivatedRoute) {}

	ngOnInit() {
		this.id = this.active_route.snapshot.params['id'];
		this.service.getSingleOrder(this.id).subscribe((res) => {
			if ((res.status = true)) {
				this.orderDetail = res.order;
				console.log(this.orderDetail);
			} else {
				alert('Connection lost');
			}
		});
	}

	getCartdetail(cartItemId) {
		this.cartDetailShow = true;
		console.log(cartItemId);
	}
}
