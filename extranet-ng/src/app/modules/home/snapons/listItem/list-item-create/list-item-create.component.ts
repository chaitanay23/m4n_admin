import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../../shared/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'app-list-item-create',
	templateUrl: './list-item-create.component.html',
	styleUrls: [ './list-item-create.component.css' ]
})
export class ListItemCreateComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private route: Router,
		private service: MainService,
		private active_route: ActivatedRoute
	) {}

	listItemForm: FormGroup;
	private image: File;
	private brand: File;
	id: number;
	edit_data: string;
	pre_name: string;
	pre_price: number;
	pre_item: string;
	pre_type: string = '';
	pre_limit: number;
	pre_desc: string;
	isButtonVisible: boolean = false;
	pre_imageUrl: string;
	pre_brandUrl: string;
	baseUrl: string = environment.url;

	ngOnInit() {
		this.id = this.active_route.snapshot.params['id'];
		if (this.id) {
			this.isButtonVisible = true;
			this.service.listItemGetById(this.id).subscribe((res) => {
				if (res.status == true) {
					this.edit_data = res.result;
					this.pre_name = this.edit_data['title'] ? this.edit_data['title'] : '';
					this.pre_price = this.edit_data['price'] ? this.edit_data['price'] : '0';
					this.pre_item = this.edit_data['item_code'] ? this.edit_data['item_code'] : '';
					this.pre_type = this.edit_data['type'] ? this.edit_data['type'] : '';
					this.pre_limit = this.edit_data['finger_limit'] ? this.edit_data['finger_limit'] : '';
					this.pre_desc = this.edit_data['description'] ? this.edit_data['description'] : '';
					this.pre_imageUrl = this.edit_data['imageUrl'] ? this.baseUrl + this.edit_data['imageUrl'] : '';
					this.pre_brandUrl = this.edit_data['brand_imageUrl']
						? this.baseUrl + this.edit_data['brand_imageUrl']
						: '';
				}
			});
		}
		this.listItemForm = this.formBuilder.group({
			name: [ '', Validators.required ],
			price: [ '', Validators.required ],
			description: '',
			item_code: [ '', Validators.required ],
			item_type: [ '', Validators.required ],
			limit: [ '', Validators.required ]
		});
	}

	updateItem() {
		console.log(this.listItemForm.value, this.image);
		if (!this.listItemForm.valid) {
			return;
		} else {
			this.service.listItemUpdate(this.id, this.listItemForm.value, this.image, this.brand).subscribe((res) => {
				console.log(res);
				if (res.status == true) {
					this.route.navigate([ 'item/index' ]);
				} else {
					alert('Unable to submit');
				}
			});
		}
	}

	imageUpload(event) {
		this.image = event.target.files[0];
	}
	brandImageUpload(event) {
		this.brand = event.target.files[0];
	}
	onSubmit() {
		if (!this.listItemForm.valid) {
			return;
		} else {
			this.service.listItemCreate(this.listItemForm.value, this.image, this.brand).subscribe((res) => {
				if (res.status == true) {
					this.route.navigate([ 'item/index' ]);
				} else {
					console.log(res.errors);
					alert('Unable to submit');
				}
			});
		}
	}
}
