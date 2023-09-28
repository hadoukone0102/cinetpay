import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoanonymousComponent } from './noanonymous.component';

describe('NoanonymousComponent', () => {
  let component: NoanonymousComponent;
  let fixture: ComponentFixture<NoanonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoanonymousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoanonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
