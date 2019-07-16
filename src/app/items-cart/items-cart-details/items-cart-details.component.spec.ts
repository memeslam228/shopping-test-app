import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCartDetailsComponent } from './items-cart-details.component';

describe('ItemsCartDetailsComponent', () => {
  let component: ItemsCartDetailsComponent;
  let fixture: ComponentFixture<ItemsCartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsCartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
