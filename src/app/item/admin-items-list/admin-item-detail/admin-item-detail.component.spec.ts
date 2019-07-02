import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemDetailComponent } from './admin-item-detail.component';

describe('AdminItemDetailComponent', () => {
  let component: AdminItemDetailComponent;
  let fixture: ComponentFixture<AdminItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
