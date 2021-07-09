import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithShipsComponent } from './input-with-ships.component';

describe('InputWithShipsComponent', () => {
  let component: InputWithShipsComponent;
  let fixture: ComponentFixture<InputWithShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithShipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
