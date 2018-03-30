import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDashboardComponent } from './pet-dashboard.component';

describe('PetDashboardComponent', () => {
  let component: PetDashboardComponent;
  let fixture: ComponentFixture<PetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
