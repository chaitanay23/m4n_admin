import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../../shared/services/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'app-package-index',
	templateUrl: './package-index.component.html',
	styleUrls: [ './package-index.component.css' ]
})
export class PackageIndexComponent implements OnInit {
  url = environment.url;
	private packages: [] = [];
	constructor(private service: MainService, private router: Router) {
		this.service.getAllPackages().subscribe((res) => {
      if(res.status = true){
        console.log(res.packages);
        this.packages = res.packages;
      }
		});
	}

	onClick(event) {
		let value = JSON.parse(event.target.value);
		if (value.flag == 1) {
			let flag = 0;
			this.service.updateFlag(value.id, flag).subscribe((res) => {
				console.log(res);
			});
		} else {
			let flag = 1;
			this.service.updateFlag(value.id, flag).subscribe((res) => {
				console.log(res);
			});
		}
  }

  isCustomizable(event){
    let value = JSON.parse(event.target.value);
    if (value.isCustomizable == "true") {
			let isCustomizable = "false";
			this.service.updateCustomize(value.id, isCustomizable).subscribe((res) => {
				console.log(res);
			});
		} else {
			let isCustomizable = "true";
			this.service.updateCustomize(value.id, isCustomizable).subscribe((res) => {
				console.log(res);
			});
		}
  }

	ngOnInit() {}
}
