import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../../shared/services/main.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
@Component({
	selector: 'app-package-create',
	templateUrl: './package-create.component.html',
	styleUrls: ['./package-create.component.css']
})
export class PackageCreateComponent implements OnInit {
  url = environment.url;
	pkgId: any;
	pkgImage: any;
	selected_finger: Array<Object> = [];
	selected_Colors: Array<Number> = [];
	selected_customs: Array<Number> = [];
	imageUrl:any;
	selectable = false;
	removable = true;
	isFormForUpdate = false;

	constructor(
		private formBuilder: FormBuilder,
		private route: Router,
		private service: MainService,
		private active_route: ActivatedRoute
	) {
		this.active_route.params.subscribe(res => {
			this.pkgId = res.id;
			if(this.pkgId){
				this.isFormForUpdate = true;
			}
      if(this.isFormForUpdate){
        this.service.getSinglePackage(res.id).subscribe(res => {
          if(res.status == true){
            this.pkgImage = res.package.imageUrl;
            this.selected_Colors = res.package.colors.id;
            this.selected_finger = res.package.customization.fingers;
            this.selected_customs = res.package.customization.list_items;
            this.imageUrl = res.package.imageUrl;
            this.packageForm.patchValue({
              name: res.package.name,
              display_price: res.package.display_price,
              price: res.package.price,
              page_title1: res.package.page_title1,
              page_title2: res.package.page_title2,
              description: res.package.description,
              fancy_limit: res.package.fancy_nail_qty,
              offer: res.package.offer,
              cta: res.package.cta_text
            });
          }
        });
      }
		})

	}
	private image: File;
	packageForm: FormGroup;
	type: string;
	gloss_data: any;
	selected_gloss: Array<Object> = [];
	matte_data: any;
	selected_matte: Array<Object> = [];
	glitter_data: any;
	selected_glitter: Array<Object> = [];
	pattern_data: any;
	selected_pattern: Array<Object> = [];
	sticker_data: any;
	selected_sticker: Array<Object> = [];
	jewellery_data: any;
	selected_jewellery: Array<Object> = [];

	colors: any;
	customization: any;
	onUpdate($event) {
		alert('clicked');
		console.log('save button is clicked', $event);
	}

	ngOnInit() {

		this.service.getListByType('color-gloss').subscribe((res) => {
			this.gloss_data = res.items;
		});
		this.service.getListByType('color-matte').subscribe((res) => {
			this.matte_data = res.items;
		});
		this.service.getListByType('glitter').subscribe((res) => {
			this.glitter_data = res.items;
		});
		this.service.getListByType('pattern').subscribe((res) => {
			this.pattern_data = res.items;
		});
		this.service.getListByType('sticker').subscribe((res) => {
			this.sticker_data = res.items;
		});
		this.service.getListByType('jewellery').subscribe((res) => {
			this.jewellery_data = res.items;
		});

		this.packageForm = this.formBuilder.group({
			name: ['', Validators.required],
			display_price: '',
			price: ['', Validators.required],
			description: ['', Validators.required],
			page_title1: '',
			page_title2: '',
			cta: ['', Validators.required],
			fancy_limit: 0,
			offer: 0
		});
	}

	remove(item) {
		const index = this.selected_finger.indexOf(item);
		if (index >= 0) {
			this.selected_finger.splice(index, 1);
		}

	}
	removeColor(item) {
		const index = this.selected_Colors.indexOf(item);
		if (index >= 0) {
			this.selected_Colors.splice(index, 1);
		}
	}
	removeCustom(item) {
		const index = this.selected_customs.indexOf(item);
		if (index >= 0) {
			this.selected_customs.splice(index, 1);
		}
	}
	onGlossChange(event) {
		if (event != 'null' && !this.selected_Colors.includes(Number(event))) {
			this.selected_Colors.push(Number(event));
		} else {
			this.selected_Colors.splice(this.selected_Colors.indexOf(Number(event)), 1);
		}
	}

	onMatteChange(event) {
		if (event != 'null' && !this.selected_Colors.includes(Number(event))) {
			this.selected_Colors.push(Number(event));
		} else {
			this.selected_Colors.splice(this.selected_Colors.indexOf(Number(event)), 1);
		}
	}

	onGlitterChange(event) {
		if (event != 'null' && !this.selected_customs.includes(Number(event))) {
			this.selected_customs.push(Number(event));
		} else {
			this.selected_customs.splice(this.selected_customs.indexOf(Number(event)), 1);
		}
	}
	onPatternChange(event) {
		if (event != 'null' && !this.selected_customs.includes(Number(event))) {
			this.selected_customs.push(Number(event));
		} else {
			this.selected_customs.splice(this.selected_customs.indexOf(Number(event)), 1);
		}
	}
	onStickerChange(event) {
		if (event != 'null' && !this.selected_customs.includes(Number(event))) {
			this.selected_customs.push(Number(event));
		} else {
			this.selected_customs.splice(this.selected_customs.indexOf(Number(event)), 1);
		}
	}
	onJewelleryChange(event) {
		if (event != 'null' && !this.selected_customs.includes(Number(event))) {
			this.selected_customs.push(Number(event));
		} else {
			this.selected_customs.splice(this.selected_customs.indexOf(Number(event)), 1);
		}
	}

	imageUpload(event) {
		this.image = event.target.files[0];
	}

	onFingerChange(event: string) {
		if (event && !this.selected_finger.includes(event)) {
			this.selected_finger.push(event);
		} else {
			this.selected_finger.splice(this.selected_finger.indexOf(event), 1);
		}
	}
	onSubmit() {
		this.colors = {
			id: [ ...this.selected_Colors ]
		};

		this.customization = {
			fingers: this.selected_finger,
			list_items: [
				...this.selected_customs
			]
		};
		console.log(this.packageForm.value);
		console.log(this.colors);
		if(this.isFormForUpdate = true ){
			this.service.packageUpdate(this.packageForm.value,this.colors,this.customization,this.pkgId,this.image)
			.subscribe(res=>{
				console.log(res);
				if (res.status == true) {
					this.route.navigate([ 'package/index' ]);
				} else {
					console.log(res.errors);
					alert('Unable to submit');
				}
			})
		}else{
		if (!this.packageForm.valid) {
			return;
		} else {
			this.service
				.packageCreate(this.packageForm.value,this.colors,this.customization,this.image)
				.subscribe((res) => {
					if (res.status == true) {
						this.route.navigate([ 'package/index' ]);
					} else {
						console.log(res.errors);
						alert('Unable to submit');
					}
				});
		}
	}
}
  allGloss(){
    this.gloss_data.forEach(item => {
      if(!this.selected_Colors.includes(item['id'])){
        this.selected_Colors.push(item['id'])
      }
    })
  }
  allMatte(){
    this.matte_data.forEach(item => {
      if(!this.selected_Colors.includes(item['id'])){
        this.selected_Colors.push(item['id'])
      }
    })
  }
  allGlitter(){
    this.glitter_data.forEach(item => {
      if(!this.selected_customs.includes(item['id'])){
        this.selected_customs.push(item['id'])
      }
    })
  }
  allPattern(){
    this.pattern_data.forEach(item => {
      if(!this.selected_customs.includes(item['id'])){
        this.selected_customs.push(item['id'])
      }
    })
  }
  allSticker(){
    this.sticker_data.forEach(item => {
      if(!this.selected_customs.includes(item['id'])){
        this.selected_customs.push(item['id'])
      }
    })
  }
  allJewellery(){
    this.jewellery_data.forEach(item => {
      if(!this.selected_customs.includes(item['id'])){
        this.selected_customs.push(item['id'])
      }
    })
  }
  removeColors(){
    this.selected_Colors = [];
  }
  removeallCustom(){
    this.selected_customs = [];
  }
}
