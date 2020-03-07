import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../../shared/services/main.service';
@Component({
	selector: 'app-list-item-index',
	templateUrl: './list-item-index.component.html',
	styleUrls: [ './list-item-index.component.css' ]
})
export class ListItemIndexComponent implements OnInit {
	listItems;
	constructor(private service: MainService) {}

	ngOnInit() {
		this.service.listItemGet().subscribe((res) => {
			this.listItems = res.items;
		});
	}
}
