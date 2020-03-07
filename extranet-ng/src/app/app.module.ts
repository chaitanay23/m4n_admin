import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './modules/home/login/login.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminIndexComponent } from './modules/home/users/admin/admin-index/admin-index.component';
import { AdminCreateComponent } from './modules/home/users/admin/admin-create/admin-create.component';

import { PackageIndexComponent } from './modules/home/snapons/package/package-index/package-index.component';
import { PackageCreateComponent } from './modules/home/snapons/package/package-create/package-create.component';
import { ListItemIndexComponent } from './modules/home/snapons/listItem/list-item-index/list-item-index.component';
import { ListItemCreateComponent } from './modules/home/snapons/listItem/list-item-create/list-item-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresetCreateComponent } from './modules/home/snapons/preset/preset-create/preset-create/preset-create.component';
import { PresetIndexComponent } from './modules/home/snapons/preset/preset-index/preset-index/preset-index.component';
import { OrderListComponent } from './modules/home/order/order-list/order-list.component';
import { OrderShowComponent } from './modules/home/order/order-show/order-show.component';
import { MatTableModule } from '@angular/material/table';
import { FileuploadDirective } from './fileupload.directive';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HeaderComponent,
		SidebarComponent,
		DashboardComponent,
		AdminIndexComponent,
		AdminCreateComponent,
		PackageIndexComponent,
		PackageCreateComponent,
		ListItemIndexComponent,
		ListItemCreateComponent,
		PresetCreateComponent,
		PresetIndexComponent,
		OrderListComponent,
		OrderShowComponent,
		FileuploadDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
		ChartsModule,
		NgxPaginationModule,
		BrowserAnimationsModule,
		MatSliderModule,
		MatChipsModule,
		MatIconModule,
		MatTableModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
