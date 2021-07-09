import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHeaderComponent } from './filters-header.component';

describe('FiltersHeaderComponent', () => {
  let component: FiltersHeaderComponent;
  let fixture: ComponentFixture<FiltersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
