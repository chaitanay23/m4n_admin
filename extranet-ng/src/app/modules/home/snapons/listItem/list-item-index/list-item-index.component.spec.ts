import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemIndexComponent } from './list-item-index.component';

describe('ListItemIndexComponent', () => {
	let component: ListItemIndexComponent;
	let fixture: ComponentFixture<ListItemIndexComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ ListItemIndexComponent ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListItemIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
