import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFavouriteDetailsComponent } from './items-favourite-details.component';

describe('ItemsFavouriteDetailsComponent', () => {
  let component: ItemsFavouriteDetailsComponent;
  let fixture: ComponentFixture<ItemsFavouriteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsFavouriteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFavouriteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
