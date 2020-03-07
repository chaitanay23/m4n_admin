import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, shareReplay, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	url = environment.url;
	constructor(private http: HttpClient) {}

	adminlogin(mobile, password): Observable<any> {
		return this.http
			.post(`${this.url}/ext/admin_user/login`, {
				mobileNumber: mobile,
				password: password
			})
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}

	userCount(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/admin_user/getUserCount`, {})
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}
	orderCount(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/order/getOrderCount`, {})
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}

	getUsers(path): Observable<any> {
		return this.http.get(`${this.url}` + path, {}).pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}
	/* List itemAPI  */
	revenueEarned(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/order/getTotalRevenue`, {})
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}
	graphDetails(year): Observable<any> {
		return this.http
			.post(`${this.url}/ext/order/getGPh`, { year: year })
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}
	getCurrentOrder(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/order/currentOrders`, {})
			.pipe(retry(1), catchError((val) => of(`I caught error:${val}`)));
	}

	listItemCreate(listItemData, imageUrl: File, brandUrl: File): Observable<any> {
		var formData: any = new FormData();
		formData.append('title', listItemData.name);
		formData.append('price', listItemData.price);
		formData.append('item_code', listItemData.item_code);
		formData.append('type', listItemData.item_type);
		formData.append('finger_limit', listItemData.limit);
		formData.append('description', listItemData.description);
		formData.append('image_url', imageUrl);
		formData.append('brand_imageUrl', brandUrl);
		return this.http
			.post(`${this.url}/ext/listitem/addListitem`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	listItemGet(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/listitem/getItems`)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	listItemGetById(id): Observable<any> {
		var formData: any = new FormData();
		formData.append('id', id);
		return this.http
			.post(`${this.url}/ext/listitem/getItem`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}
	listItemUpdate(id: number, listItemData, imageUrl?: File, brandUrl?: File): Observable<any> {
		var formData: any = new FormData();
		formData.append('id', id);
		formData.append('title', listItemData.name);
		formData.append('price', listItemData.price);
		formData.append('item_code', listItemData.item_code);
		formData.append('type', listItemData.item_type);
		formData.append('finger_limit', listItemData.limit);
		formData.append('description', listItemData.description);
		formData.append('image_url', imageUrl);
		formData.append('brand_imageUrl', brandUrl);
		return this.http
			.put(`${this.url}/ext/listitem/updateListitem`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	/* List itemAPI End  */

	/* package api start */

	getAllPackages(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/package/allPackages`, {})
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	updateFlag(pkgid, flag): Observable<any> {
		return this.http
			.post(`${this.url}/ext/package/updateflag`, { id: pkgid, flag: flag })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
  }

  updateCustomize(pkgid, customize): Observable<any> {
		return this.http
			.post(`${this.url}/ext/package/updateCustomize`, { id: pkgid, isCustomizable: customize })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	getSinglePackage(pkgid): Observable<any> {
		return this.http
			.post(`${this.url}/ext/package/getPackage`, { id: pkgid })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	getListByType(type: string): Observable<any> {
		var formData: any = new FormData();
		formData.append('type', type);
		return this.http
			.post(`${this.url}/ext/listitem/getItemByType`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	packageCreate(packageData, colors, customization, imageUrl?: File): Observable<any> {
		var formData: any = new FormData();
		console.log(packageData);
		formData.append('name', packageData.name);
		formData.append('price', packageData.price);
		formData.append('description', packageData.description);
		formData.append('colors', JSON.stringify(colors));
		formData.append('customization', JSON.stringify(customization));
		formData.append('fancy_nail_qty', packageData.fancy_limit);
		formData.append('offer', packageData.offer);
		formData.append('flag', 1);
		formData.append('page_title1', packageData.page_title1);
		formData.append('page_title2', packageData.page_title2);
		formData.append('cta_text', packageData.cta);
		formData.append('display_price', packageData.display_price);
		formData.append('imageUrl', imageUrl);
		return this.http
			.post(`${this.url}/ext/package/addPackage`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	packageUpdate(packageData, colors, customization, pkgid, imageUrl?: File): Observable<any> {
		var formData: any = new FormData();
		formData.append('pkgId', pkgid);
		formData.append('name', packageData.name);
		formData.append('price', packageData.price);
		formData.append('description', packageData.description);
		formData.append('colors', JSON.stringify(colors));
		formData.append('customization', JSON.stringify(customization));
		formData.append('fancy_nail_qty', packageData.fancy_limit);
		formData.append('offer', packageData.offer);
		formData.append('page_title1', packageData.page_title1);
		formData.append('page_title2', packageData.page_title2);
		formData.append('cta_text', packageData.cta);
		formData.append('display_price', packageData.display_price);
		formData.append('imageUrl', imageUrl);

		return this.http
			.put(`${this.url}/ext/package/updatePackage`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	/*Preset api start */
	getAllPreset(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/preset/getPreset`, {})
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}
	updateHot_sell(preset_id, hotSell_value) {
		return this.http
			.post(`${this.url}/ext/preset/updateHot_sell`, { id: preset_id, hot_selling: hotSell_value })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}
	updateNew_sell(preset_id, newSell_value) {
		return this.http
			.post(`${this.url}/ext/preset/updateNew_sell`, { id: preset_id, new: newSell_value })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	presetCreate(presetData, finger_object, image?: File,images?:File): Observable<any> {
		var formData: any = new FormData();
		console.log(presetData);
		formData.append('name', presetData.name);
		formData.append('description', presetData.description);
		formData.append('new', 1);
		formData.append('hot_selling', 0);
		formData.append('lf1', finger_object.lf1.toString());
		formData.append('lf2', finger_object.lf2.toString());
		formData.append('lf3', finger_object.lf3.toString());
		formData.append('lf4', finger_object.lf4.toString());
		formData.append('lf5', finger_object.lf5.toString());
		formData.append('rf1', finger_object.rf1.toString());
		formData.append('rf2', finger_object.rf2.toString());
		formData.append('rf3', finger_object.rf3.toString());
		formData.append('rf4', finger_object.rf4.toString());
		formData.append('rf5', finger_object.rf5.toString());
		formData.append('image', image);
		for(const item in images){
			formData.append('images', images[item]);
			
		}
		
		console.log('main',images);
		return this.http
			.post(`${this.url}/ext/preset/addPreset`, formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}
	presetUpdate(presetData, finger_object,presetId, image?: File,images?:File): Observable<any> {
		
		var formData: any = new FormData();
		formData.append('name', presetData.name);
		formData.append('description', presetData.description);
		formData.append('id',presetId);
		formData.append('pkgId',1);
		formData.append('lf1', finger_object.lf1.toString());
		formData.append('lf2', finger_object.lf2.toString());
		formData.append('lf3', finger_object.lf3.toString());
		formData.append('lf4', finger_object.lf4.toString());
		formData.append('lf5', finger_object.lf5.toString());
		formData.append('rf1', finger_object.rf1.toString());
		formData.append('rf2', finger_object.rf2.toString());
		formData.append('rf3', finger_object.rf3.toString());
		formData.append('rf4', finger_object.rf4.toString());
		formData.append('rf5', finger_object.rf5.toString());
		formData.append('image', image);
		for(const item in images){
			formData.append('images', images[item]);
		}
		return this.http
			.put(`${this.url}/ext/preset/updatePreset`,formData)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	getSinglePreset(id): Observable<any> {
		return this.http
			.post(`${this.url}/ext/preset/getSinglePreset`, { id: id })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	orderListGet(): Observable<any> {
		return this.http
			.get(`${this.url}/ext/order/getAllOrders`)
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}

	getSingleOrder(id): Observable<any> {
		return this.http
			.post(`${this.url}/ext/order/getSingleOrder`, { id: id })
			.pipe(retry(1), catchError((val) => of(`I caught:${val}`)));
	}
}
