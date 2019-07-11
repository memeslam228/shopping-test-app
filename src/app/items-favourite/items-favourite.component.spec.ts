import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFavouriteComponent } from './items-favourite.component';

describe('ItemsFavouriteComponent', () => {
  let component: ItemsFavouriteComponent;
  let fixture: ComponentFixture<ItemsFavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsFavouriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
