import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemandTimeComponent } from './edit-demand-time.component';

describe('EditDemandTimeComponent', () => {
  let component: EditDemandTimeComponent;
  let fixture: ComponentFixture<EditDemandTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDemandTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDemandTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
