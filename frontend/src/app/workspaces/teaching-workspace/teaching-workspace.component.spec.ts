import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingWorkspaceComponent } from './teaching-workspace.component';

describe('TeachingWorkspaceComponent', () => {
  let component: TeachingWorkspaceComponent;
  let fixture: ComponentFixture<TeachingWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
