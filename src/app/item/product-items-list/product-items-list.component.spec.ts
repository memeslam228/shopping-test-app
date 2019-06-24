import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemsListComponent } from './product-items-list.component';

describe('ProductItemsListComponent', () => {
  let component: ProductItemsListComponent;
  let fixture: ComponentFixture<ProductItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
