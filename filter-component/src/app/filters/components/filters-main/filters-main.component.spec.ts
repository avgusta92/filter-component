import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMainComponent } from './filters-main.component';

describe('FiltersMainComponent', () => {
  let component: FiltersMainComponent;
  let fixture: ComponentFixture<FiltersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
