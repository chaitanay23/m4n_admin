import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { element } from 'protractor';

@Component({
	selector: 'app-preset-create',
	templateUrl: './preset-create.component.html',
	styleUrls: [ './preset-create.component.css' ]
})
export class PresetCreateComponent implements OnInit {
	url = environment.url;
	packages: [] = [];
	listItems: [] = [];
	removable = true;
	presetForm: FormGroup;
	facade: File;
	images: File;
	left_finger1: Array<Object> = [];
	left_finger2: Array<Object> = [];
	left_finger3: Array<Object> = [];
	left_finger4: Array<Object> = [];
	left_finger5: Array<Object> = [];
	right_finger1: Array<Object> = [];
	right_finger2: Array<Object> = [];
	right_finger3: Array<Object> = [];
	right_finger4: Array<Object> = [];
	right_finger5: Array<Object> = [];
	presetUrls:Array<Object> = [];
	finger_object: any;
	presetId:Number;
	value:any;
	presetUrl:String;
	forUpdation:boolean ;

	constructor(
		private service: MainService,
		private router: Router,
		private formBuilder: FormBuilder,
		private active_route: ActivatedRoute
	) {
		this.active_route.params.subscribe((res) => {
			
			if(res.id != undefined || res.id != null){
				console.log('inside params',res);
				this.forUpdation =true;
				this.presetId = res.id;
				this.service.getSinglePreset(res.id).subscribe(res=>{
					this.left_finger1 = eval("["+res.preset.lf1+"]");
					this.left_finger2 = eval("["+res.preset.lf2+"]"); 
					this.left_finger3 = eval("["+res.preset.lf3+"]");
					this.left_finger4 = eval("["+res.preset.lf4+"]");
					this.left_finger5 = eval("["+res.preset.lf5+"]");
					this.right_finger1 = eval("["+res.preset.rf1+"]");
					this.right_finger2 = eval("["+res.preset.rf2+"]");
					this.right_finger3 = eval("["+res.preset.rf3+"]");
					this.right_finger4 = eval("["+res.preset.rf4+"]");
					this.right_finger5 = eval("["+res.preset.rf5+"]");
					this.presetForm.patchValue({
						name:res.preset.name,
						description:res.preset.name,
						package_id:res.preset.packageId
					
					})
					this.presetUrl = res.preset.image;
					this.presetUrls =res.preset.images.split(",");
					
					
				})
			}else{
				this.forUpdation = false;
			}
		
		});
	}

	ngOnInit() {
		
		this.service.getAllPackages().subscribe((res) => {
			this.packages = res.packages;
			console.log(this.packages);
		});
		this.presetForm = this.formBuilder.group({
			name: [ '', Validators.required ],
			description: [ '', Validators.required ],
			package_id: 'null'
		});
		this.service.listItemGet().subscribe((res) => {
			this.listItems = res.items;
		});
	}

	removelf1(item){
		const index = this.left_finger1.indexOf(item);
		if (index >= 0) {
			this.left_finger1.splice(index, 1);
		}	
	}
	removelf2(item){
		const index = this.left_finger2.indexOf(item);
		if (index >= 0) {
			this.left_finger2.splice(index, 1);
		}	
	}
	removelf3(item){
		const index = this.left_finger3.indexOf(item);
		if (index >= 0) {
			this.left_finger3.splice(index, 1);
		}	
	}

	removelf4(item){
		const index = this.left_finger4.indexOf(item);
		if (index >= 0) {
			this.left_finger4.splice(index, 1);
		}	
	}
	removelf5(item){
		const index = this.left_finger5.indexOf(item);
		if (index >= 0) {
			this.left_finger5.splice(index, 1);
		}	
	}

	removeRf1(item){
		const index = this.right_finger1.indexOf(item);
		if (index >= 0) {
			this.right_finger1.splice(index, 1);
		}	
	}
	removeRf2(item){
		const index = this.right_finger2.indexOf(item);
		if (index >= 0) {
			this.right_finger2.splice(index, 1);
		}	
	}
	removeRf3(item){
		const index = this.right_finger3.indexOf(item);
		if (index >= 0) {
			this.right_finger3.splice(index, 1);
		}	
	}
	removeRf4(item){
		const index = this.right_finger4.indexOf(item);
		if (index >= 0) {
			this.right_finger4.splice(index, 1);
		}	
	}
	removeRf5(item){
		const index = this.right_finger5.indexOf(item);
		if (index >= 0) {
			this.right_finger5.splice(index, 1);
		}	
	}
	

	left1(data) {
		if (data != 'null' && !this.left_finger1.includes(Number(data))) {
			this.left_finger1.push(Number(data));
		} else {
			this.left_finger1.splice(this.left_finger1.indexOf(Number(data)), 1);
		}
		console.log(this.left_finger1);
	}
	left2(data) {
		if (data != 'null' && !this.left_finger2.includes(Number(data))) {
			this.left_finger2.push(Number(data));
		} else {
			this.left_finger2.splice(this.left_finger2.indexOf(Number(data)), 1);
		}
	}
	left3(data) {
		if (data != 'null' && !this.left_finger3.includes(Number(data))) {
			this.left_finger3.push(Number(data));
		} else {
			this.left_finger3.splice(this.left_finger3.indexOf(Number(data)), 1);
		}
	}
	left4(data) {
		if (data != 'null' && !this.left_finger4.includes(Number(data))) {
			this.left_finger4.push(Number(data));
		} else {
			this.left_finger4.splice(this.left_finger4.indexOf(Number(data)), 1);
		}
	}
	left5(data) {
		if (data != 'null' && !this.left_finger5.includes(Number(data))) {
			this.left_finger5.push(Number(data));
		} else {
			this.left_finger5.splice(this.left_finger5.indexOf(Number(data)), 1);
		}
	}
	right1(data) {
		if (data != 'null' && !this.right_finger1.includes(Number(data))) {
			this.right_finger1.push(Number(data));
		} else {
			this.right_finger1.splice(this.right_finger1.indexOf(Number(data)), 1);
		}
	}
	right2(data) {
		if (data != 'null' && !this.right_finger2.includes(Number(data))) {
			this.right_finger2.push(Number(data));
		} else {
			this.right_finger2.splice(this.right_finger2.indexOf(Number(data)), 1);
		}
	}
	right3(data) {
		if (data != 'null' && !this.right_finger3.includes(Number(data))) {
			this.right_finger3.push(Number(data));
		} else {
			this.right_finger3.splice(this.right_finger3.indexOf(Number(data)), 1);
		}
	}
	right4(data) {
		if (data != 'null' && !this.right_finger4.includes(Number(data))) {
			this.right_finger4.push(Number(data));
		} else {
			this.right_finger4.splice(this.right_finger4.indexOf(Number(data)), 1);
		}
	}
	right5(data) {
		if (data != 'null' && !this.right_finger5.includes(Number(data))) {
			this.right_finger5.push(Number(data));
		} else {
			this.right_finger5.splice(this.right_finger5.indexOf(Number(data)), 1);
		}
	}

	imageUpload(event) {
		this.facade = event.target.files[0];
	}

	multipleUpload(event) {
		 if(event.target.files.length > 1){
			this.images = event.target.files;
			console.log(this.images);
		}
	}

	onSubmit() {
		
		this.finger_object = {
			lf1: this.left_finger1,
			lf2: this.left_finger2,
			lf3: this.left_finger3,
			lf4: this.left_finger4,
			lf5: this.left_finger5,
			rf1: this.right_finger1,
			rf2: this.right_finger2,
			rf3: this.right_finger3,
			rf4: this.right_finger4,
			rf5: this.right_finger5
		};
		if(this.forUpdation == false){
			console.log(this.forUpdation , 'onsubmit');
			this.service.presetCreate(this.presetForm.value, this.finger_object, this.facade,this.images).subscribe((res) => {
				if (res.status == true) {
					this.router.navigate([ 'preset/index' ]);
				} else {
					console.log(res.errors);
					alert('Unable to submit');
				}
			});
		}else{
			
			this.service.presetUpdate(this.presetForm.value,this.finger_object,this.presetId,this.facade,this.images).subscribe(res=>{
				console.log(res);
				if (res.status == true) {
					this.router.navigate([ 'preset/index' ]);
				} else {
					console.log(res.errors);
					alert('Unable to submit');
				}
			})
		}
		
	}
}
