import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayCellComponent } from './array-cell.component';

describe('ArrayCellComponent', () => {
  let component: ArrayCellComponent;
  let fixture: ComponentFixture<ArrayCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
