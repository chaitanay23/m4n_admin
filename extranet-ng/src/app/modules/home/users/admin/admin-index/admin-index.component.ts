import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../auth/auth.service';
import { MainService } from '../../../../../shared/services/main.service';

@Component({
	selector: 'app-admin-index',
	templateUrl: './admin-index.component.html',
	styleUrls: [ './admin-index.component.css' ]
})
export class AdminIndexComponent implements OnInit {
	paramName: String;
	partnerPath = '/ext/admin_user/partners';
	custPath = '/ext/admin_user/customerCareUser';
	factoryPath = '/ext/admin_user//factoryUsers';
	userDetails: [] = [];
	message: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private service: MainService,
		private authService: AuthService
	) {
		this.route.params.subscribe((params) => {});
	}

	ngOnInit() {}
}
