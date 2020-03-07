import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/home/login/login.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { AdminIndexComponent } from './modules/home/users/admin/admin-index/admin-index.component';
import { AdminCreateComponent } from './modules/home/users/admin/admin-create/admin-create.component';
import { PackageIndexComponent } from './modules/home/snapons/package/package-index/package-index.component';
import { PackageCreateComponent } from './modules/home/snapons/package/package-create/package-create.component';
import { ListItemIndexComponent } from './modules/home/snapons/listItem/list-item-index/list-item-index.component';
import { ListItemCreateComponent } from './modules/home/snapons/listItem/list-item-create/list-item-create.component';
import { PresetIndexComponent } from './modules/home/snapons/preset/preset-index/preset-index/preset-index.component';
import { PresetCreateComponent } from './modules/home/snapons/preset/preset-create/preset-create/preset-create.component';
import { OrderListComponent } from './modules/home/order/order-list/order-list.component';
import { OrderShowComponent } from './modules/home/order/order-show/order-show.component';
import { AuthGuard } from './auth/auth.guard';
import { AnonymousGuard } from './auth/anonymous.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [ AnonymousGuard ] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
	{ path: 'admin/index', component: AdminIndexComponent, canActivate: [ AuthGuard ] },
	{ path: 'admin/form', component: AdminCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'package/index', component: PackageIndexComponent, canActivate: [ AuthGuard ] },
	{ path: 'package/form', component: PackageCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'package/form/:id', component: PackageCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'preset/index', component: PresetIndexComponent, canActivate: [ AuthGuard ] },
	{ path: 'preset/form', component: PresetCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'preset/form/:id', component: PresetCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'item/index', component: ListItemIndexComponent, canActivate: [ AuthGuard ] },
	{ path: 'item/form', component: ListItemCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'item/form/:id', component: ListItemCreateComponent, canActivate: [ AuthGuard ] },
	{ path: 'order/index', component: OrderListComponent, canActivate: [ AuthGuard ] },
	{ path: 'order/show/:id', component: OrderShowComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
